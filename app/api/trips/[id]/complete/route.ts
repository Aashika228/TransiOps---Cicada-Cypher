import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Trip from '@/lib/models/Trip';
import Vehicle from '@/lib/models/Vehicle';
import Driver from '@/lib/models/Driver';
import FuelLog from '@/lib/models/FuelLog';

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
    try {
        await connectToDatabase();
        const { id } = await context.params;
        const { finalOdometer, fuelConsumedLiters, fuelCost } = await req.json();

        const trip = await Trip.findById(id);
        if (!trip) return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
        
        if (trip.status !== 'Dispatched') {
            return NextResponse.json({ error: 'Only dispatched trips can be completed.' }, { status: 400 });
        }

        const vehicle = await Vehicle.findById(trip.vehicleId);
        const driver = await Driver.findById(trip.driverId);

        if (finalOdometer <= vehicle.odometer) {
            return NextResponse.json({ error: `Final odometer (${finalOdometer}) must be greater than current (${vehicle.odometer})` }, { status: 400 });
        }

        const actualDistance = finalOdometer - vehicle.odometer;

        // 1. Update Trip
        trip.status = 'Completed';
        trip.completedAt = new Date();
        trip.actualDistance = actualDistance;
        trip.fuelConsumedLiters = fuelConsumedLiters;
        trip.fuelCost = fuelCost;
        await trip.save();

        // 2. Update Vehicle
        vehicle.status = 'Available';
        vehicle.odometer = finalOdometer;
        await vehicle.save();

        // 3. Update Driver
        driver.status = 'Available';
        await driver.save();

        // 4. Log Fuel Expense
        if (fuelConsumedLiters > 0) {
            await FuelLog.create({
                vehicleId: vehicle._id,
                liters: fuelConsumedLiters,
                cost: fuelCost,
                date: new Date()
            });
        }

        return NextResponse.json(trip);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
