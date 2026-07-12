import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Trip from '@/lib/models/Trip';
import Vehicle from '@/lib/models/Vehicle';
import Driver from '@/lib/models/Driver';

export async function PATCH(req: Request, { params }: { params: { id: string; action: string } }) {
    try {
        await connectToDatabase();
        const { id, action } = params;
        const trip = await Trip.findById(id);

        if (!trip) return NextResponse.json({ error: 'Trip not found' }, { status: 404 });

        const vehicle = await Vehicle.findById(trip.vehicleId);
        const driver = await Driver.findById(trip.driverId);

        if (!vehicle || !driver) return NextResponse.json({ error: 'Assigned Vehicle or Driver not found' }, { status: 404 });

        if (action === 'dispatch') {
            if (trip.status !== 'Draft') return NextResponse.json({ error: 'Only Draft trips can be dispatched' }, { status: 400 });
            
            trip.status = 'Dispatched';
            trip.dispatchTime = new Date();
            
            // Automatic Status Transitions
            vehicle.status = 'On Trip';
            driver.status = 'On Trip';
            vehicle.currentLocation = `En route to ${trip.destination}`;
            driver.currentLocation = `En route to ${trip.destination}`;

            await Promise.all([trip.save(), vehicle.save(), driver.save()]);
            return NextResponse.json(trip);
        }

        if (action === 'complete') {
            if (trip.status !== 'Dispatched') return NextResponse.json({ error: 'Only Dispatched trips can be completed' }, { status: 400 });
            
            const body = await req.json().catch(() => ({}));
            
            trip.status = 'Completed';
            trip.completionTime = new Date();
            
            // Automatic Status Transitions
            vehicle.status = 'Available';
            driver.status = 'Available';
            vehicle.currentLocation = trip.destination;
            driver.currentLocation = trip.destination;
            vehicle.odometer += trip.plannedDistance; // Update Odometer

            await Promise.all([trip.save(), vehicle.save(), driver.save()]);
            return NextResponse.json(trip);
        }

        if (action === 'cancel') {
            if (trip.status === 'Completed') return NextResponse.json({ error: 'Cannot cancel a completed trip' }, { status: 400 });

            trip.status = 'Cancelled';
            
            // Automatic Status Transitions
            vehicle.status = 'Available';
            driver.status = 'Available';
            vehicle.currentLocation = trip.source; // Return to source
            driver.currentLocation = trip.source;

            await Promise.all([trip.save(), vehicle.save(), driver.save()]);
            return NextResponse.json(trip);
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
