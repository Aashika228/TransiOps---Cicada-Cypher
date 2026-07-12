// TransitOps - P2 (Trip Logic Owner) Implementation
// This file contains the comprehensive state validation, business logic, 
// database operations, and status transition flows for the Trip Management module.

import { db } from './db'; // Mock database or ORM client

// Constants representing statuses
export const TRIP_STATUS = {
  DRAFT: 'Draft',
  DISPATCHED: 'Dispatched',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled'
};

export const VEHICLE_STATUS = {
  AVAILABLE: 'Available',
  ON_TRIP: 'On Trip',
  IN_SHOP: 'In Shop',
  RETIRED: 'Retired'
};

export const DRIVER_STATUS = {
  AVAILABLE: 'Available',
  ON_TRIP: 'On Trip',
  OFF_DUTY: 'Off Duty',
  SUSPENDED: 'Suspended'
};

/**
 * Validates whether a trip can be created or updated with the specified parameters.
 * Enforces all Mandatory Business Rules for P2.
 */
export async function validateTripAssignment({
  vehicleId,
  driverId,
  cargoWeight,
  tripId = null // If updating an existing trip
}) {
  // Fetch Vehicle Details
  const vehicle = await db.vehicle.findUnique({ where: { id: vehicleId } });
  if (!vehicle) {
    throw new Error('Vehicle not found.');
  }

  // Fetch Driver Details
  const driver = await db.driver.findUnique({ where: { id: driverId } });
  if (!driver) {
    throw new Error('Driver not found.');
  }

  // Fetch current trip if editing
  const existingTrip = tripId ? await db.trip.findUnique({ where: { id: tripId } }) : null;

  // RULE 1: Cargo Weight must not exceed the vehicle's maximum load capacity
  if (cargoWeight > vehicle.maxLoadCapacity) {
    throw new Error(
      `Validation Failed: Cargo weight (${cargoWeight} kg) exceeds maximum vehicle capacity (${vehicle.maxLoadCapacity} kg) of ${vehicle.name}.`
    );
  }

  // RULE 2: Retired or In Shop vehicles must never appear in dispatch selection / cannot be dispatched
  if (vehicle.status === VEHICLE_STATUS.RETIRED || vehicle.status === VEHICLE_STATUS.IN_SHOP) {
    throw new Error(`Validation Failed: Vehicle is currently ${vehicle.status} and cannot be assigned to trips.`);
  }

  // RULE 3: Drivers with expired licenses or Suspended status cannot be assigned to trips
  if (driver.status === DRIVER_STATUS.SUSPENDED) {
    throw new Error(`Validation Failed: Driver is Suspended and cannot be assigned to trips.`);
  }
  
  const today = new Date();
  const licenseExpiry = new Date(driver.licenseExpiryDate);
  if (licenseExpiry < today) {
    throw new Error(`Validation Failed: Driver's license has expired on ${driver.licenseExpiryDate.toDateString()}.`);
  }

  // RULE 4: A driver or vehicle already marked "On Trip" cannot be assigned to another trip
  // (We bypass this check only if the driver/vehicle is already assigned to THIS specific trip in a non-dispatched state)
  const isVehicleAssignedToOtherActive = await db.trip.findFirst({
    where: {
      vehicleId,
      status: TRIP_STATUS.DISPATCHED,
      id: { not: tripId }
    }
  });
  if (vehicle.status === VEHICLE_STATUS.ON_TRIP || isVehicleAssignedToOtherActive) {
    throw new Error(`Validation Failed: Vehicle is already assigned to an active trip.`);
  }

  const isDriverAssignedToOtherActive = await db.trip.findFirst({
    where: {
      driverId,
      status: TRIP_STATUS.DISPATCHED,
      id: { not: tripId }
    }
  });
  if (driver.status === DRIVER_STATUS.ON_TRIP || isDriverAssignedToOtherActive) {
    throw new Error(`Validation Failed: Driver is already assigned to an active trip.`);
  }

  return { isValid: true, vehicle, driver };
}

/**
 * Creates a new Trip in DRAFT status.
 */
export async function createTrip(tripData) {
  const { source, destination, vehicleId, driverId, cargoWeight, plannedDistance } = tripData;

  // Run validations
  await validateTripAssignment({ vehicleId, driverId, cargoWeight });

  // Save the trip in Draft mode
  const newTrip = await db.trip.create({
    data: {
      source,
      destination,
      vehicleId,
      driverId,
      cargoWeight,
      plannedDistance,
      status: TRIP_STATUS.DRAFT
    }
  });

  return newTrip;
}

/**
 * Dispatches a trip, enforcing status updates on both Vehicle and Driver.
 * RULE: Dispatching a trip automatically changes both the vehicle and driver status to "On Trip".
 */
export async function dispatchTrip(tripId) {
  const trip = await db.trip.findUnique({ where: { id: tripId } });
  if (!trip) throw new Error('Trip not found.');
  if (trip.status !== TRIP_STATUS.DRAFT) {
    throw new Error(`Cannot dispatch a trip that is in ${trip.status} status.`);
  }

  // Re-validate right before dispatching
  await validateTripAssignment({
    vehicleId: trip.vehicleId,
    driverId: trip.driverId,
    cargoWeight: trip.cargoWeight,
    tripId: trip.id
  });

  // Use a transaction to ensure atomic updates
  return await db.$transaction(async (tx) => {
    // 1. Update Trip status to Dispatched
    const updatedTrip = await tx.trip.update({
      where: { id: tripId },
      data: { status: TRIP_STATUS.DISPATCHED, dispatchedAt: new Date() }
    });

    // 2. Automatically change vehicle status to "On Trip"
    await tx.vehicle.update({
      where: { id: trip.vehicleId },
      data: { status: VEHICLE_STATUS.ON_TRIP }
    });

    // 3. Automatically change driver status to "On Trip"
    await tx.driver.update({
      where: { id: trip.driverId },
      data: { status: DRIVER_STATUS.ON_TRIP }
    });

    return updatedTrip;
  });
}

/**
 * Completes an active trip, record final metrics, and release assets.
 * RULE: Completing a trip automatically changes both the vehicle and driver status back to "Available".
 */
export async function completeTrip(tripId, { finalOdometer, fuelConsumedLiters, fuelCost }) {
  const trip = await db.trip.findUnique({ where: { id: tripId }, include: { vehicle: true } });
  if (!trip) throw new Error('Trip not found.');
  if (trip.status !== TRIP_STATUS.DISPATCHED) {
    throw new Error('Only dispatched/active trips can be completed.');
  }

  if (finalOdometer <= trip.vehicle.odometer) {
    throw new Error(`Final odometer (${finalOdometer}) must be greater than current vehicle odometer (${trip.vehicle.odometer}).`);
  }

  const actualDistance = finalOdometer - trip.vehicle.odometer;

  return await db.$transaction(async (tx) => {
    // 1. Update Trip status to Completed and record final values
    const completedTrip = await tx.trip.update({
      where: { id: tripId },
      data: {
        status: TRIP_STATUS.COMPLETED,
        completedAt: new Date(),
        actualDistance,
        fuelConsumedLiters,
        fuelCost
      }
    });

    // 2. Automatically change vehicle status back to "Available" and update odometer
    await tx.vehicle.update({
      where: { id: trip.vehicleId },
      data: {
        status: VEHICLE_STATUS.AVAILABLE,
        odometer: finalOdometer
      }
    });

    // 3. Automatically change driver status back to "Available"
    await tx.driver.update({
      where: { id: trip.driverId },
      data: { status: DRIVER_STATUS.AVAILABLE }
    });

    // 4. Automatically log fuel/expense for reporting
    if (fuelConsumedLiters > 0) {
      await tx.fuelLog.create({
        data: {
          vehicleId: trip.vehicleId,
          tripId: tripId,
          liters: fuelConsumedLiters,
          cost: fuelCost,
          date: new Date()
        }
      });
    }

    return completedTrip;
  });
}

/**
 * Cancels a dispatched/active trip and restores assets to Available.
 * RULE: Cancelling a dispatched trip restores the vehicle and driver to "Available".
 */
export async function cancelTrip(tripId) {
  const trip = await db.trip.findUnique({ where: { id: tripId } });
  if (!trip) throw new Error('Trip not found.');
  
  if (trip.status !== TRIP_STATUS.DISPATCHED && trip.status !== TRIP_STATUS.DRAFT) {
    throw new Error(`Cannot cancel a trip that is already ${trip.status}.`);
  }

  // If canceling a Draft, just mark it Canceled (no vehicle/driver status changes needed)
  if (trip.status === TRIP_STATUS.DRAFT) {
    return await db.trip.update({
      where: { id: tripId },
      data: { status: TRIP_STATUS.CANCELLED }
    });
  }

  return await db.$transaction(async (tx) => {
    // 1. Update Trip status to Cancelled
    const cancelledTrip = await tx.trip.update({
      where: { id: tripId },
      data: { status: TRIP_STATUS.CANCELLED, cancelledAt: new Date() }
    });

    // 2. Restore Vehicle status to "Available"
    await tx.vehicle.update({
      where: { id: trip.vehicleId },
      data: { status: VEHICLE_STATUS.AVAILABLE }
    });

    // 3. Restore Driver status to "Available"
    await tx.driver.update({
      where: { id: trip.driverId },
      data: { status: DRIVER_STATUS.AVAILABLE }
    });

    return cancelledTrip;
  });
}
