import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Trip from '@/lib/models/Trip';
import Vehicle from '@/lib/models/Vehicle';
import Driver from '@/lib/models/Driver';

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
    try {
        await connectToDatabase();
        const { id } = await context.params;

        const trip = await Trip.findById(id);
        if (!trip) return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
        
        if (trip.status !== 'Draft') {
            return NextResponse.json({ error: `Cannot dispatch a trip that is ${trip.status}` }, { status: 400 });
        }

        // Re-validate right before dispatching
        const vehicle = await Vehicle.findById(trip.vehicleId);
        const driver = await Driver.findById(trip.driverId);

        if (vehicle.status === 'On Trip' || driver.status === 'On Trip') {
            return NextResponse.json({ error: 'Validation Failed: Cannot dispatch, assets are already on another trip.' }, { status: 400 });
        }

        trip.status = 'Dispatched';
        trip.dispatchedAt = new Date();
        await trip.save();

        // 2. Automatically change vehicle status to "On Trip"
        vehicle.status = 'On Trip';
        await vehicle.save();

        // 3. Automatically change driver status to "On Trip"
        driver.status = 'On Trip';
        await driver.save();

        return NextResponse.json(trip);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
