import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Vehicle from '@/lib/models/Vehicle';

export async function GET() {
    try {
        await connectToDatabase();
        const vehicles = await Vehicle.find({});
        return NextResponse.json(vehicles);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const body = await req.json();
        
        // Ensure uniqueness check or allow Mongoose to handle it
        const newVehicle = await Vehicle.create(body);
        return NextResponse.json(newVehicle, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
