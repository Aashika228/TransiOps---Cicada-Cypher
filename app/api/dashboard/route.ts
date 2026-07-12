import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
export const dynamic = 'force-dynamic';
import Vehicle from '@/lib/models/Vehicle';
import Trip from '@/lib/models/Trip';
import Driver from '@/lib/models/Driver';

export async function GET() {
    try {
        await connectToDatabase();

        const [vehicles, trips, drivers] = await Promise.all([
            Vehicle.find({}),
            Trip.find({}),
            Driver.find({})
        ]);

        const totalVehicles = vehicles.length;
        const availableVehicles = vehicles.filter(v => v.status === 'Available').length;
        const activeVehicles = vehicles.filter(v => v.status === 'Available' || v.status === 'On Trip').length;
        const maintenanceVehicles = vehicles.filter(v => v.status === 'In Shop').length;

        const activeTrips = trips.filter(t => t.status === 'Dispatched').length;
        const pendingTrips = trips.filter(t => t.status === 'Draft').length;

        const driversOnDuty = drivers.filter(d => d.status === 'On Trip').length;

        const utilization = totalVehicles > 0 
            ? Math.round((vehicles.filter(v => v.status === 'On Trip').length / totalVehicles) * 100) 
            : 0;

        return NextResponse.json({
            activeVehicles,
            availableVehicles,
            maintenanceVehicles,
            activeTrips,
            pendingTrips,
            driversOnDuty,
            utilization: `${utilization}%`
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
