import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import MaintenanceLog from '@/lib/models/MaintenanceLog';
import Vehicle from '@/lib/models/Vehicle';

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const { vehicleId, issueDescription, cost, date } = await req.json();
        
        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });

        const log = await MaintenanceLog.create({ vehicleId, issueDescription, cost, date });
        
        // Auto-update vehicle status
        vehicle.status = 'In Shop';
        await vehicle.save();

        return NextResponse.json(log, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        await connectToDatabase();
        const { searchParams } = new URL(req.url);
        const vehicleId = searchParams.get('vehicleId');
        
        const filter = vehicleId ? { vehicleId } : {};
        // Use populate to get vehicle details if needed, but keeping it simple for now
        const logs = await MaintenanceLog.find(filter).sort({ date: -1 });
        
        return NextResponse.json(logs);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
