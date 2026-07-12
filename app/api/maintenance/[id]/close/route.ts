import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import MaintenanceLog from '@/lib/models/MaintenanceLog';
import Vehicle from '@/lib/models/Vehicle';

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
    try {
        await connectToDatabase();
        const { id } = await context.params;
        const log = await MaintenanceLog.findById(id);
        if (!log) return NextResponse.json({ error: 'Log not found' }, { status: 404 });

        log.status = 'Closed';
        await log.save();

        const vehicle = await Vehicle.findById(log.vehicleId);
        if (vehicle && vehicle.status !== 'Retired') {
            vehicle.status = 'Available';
            await vehicle.save();
        }

        return NextResponse.json(log);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
