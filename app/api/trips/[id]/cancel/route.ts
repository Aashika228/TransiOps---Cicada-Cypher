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
        
        if (trip.status !== 'Dispatched' && trip.status !== 'Draft') {
            return NextResponse.json({ error: `Cannot cancel a trip that is already ${trip.status}` }, { status: 400 });
        }

        if (trip.status === 'Draft') {
            trip.status = 'Cancelled';
            trip.cancelledAt = new Date();
            await trip.save();
            return NextResponse.json(trip);
        }

        // If dispatched, we must free the resources
        trip.status = 'Cancelled';
        trip.cancelledAt = new Date();
        await trip.save();

        const vehicle = await Vehicle.findById(trip.vehicleId);
        if (vehicle) {
            vehicle.status = 'Available';
            await vehicle.save();
        }

        const driver = await Driver.findById(trip.driverId);
        if (driver) {
            driver.status = 'Available';
            await driver.save();
        }

        return NextResponse.json(trip);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
