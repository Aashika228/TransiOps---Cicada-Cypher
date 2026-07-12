import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Trip from '@/lib/models/Trip';
import Vehicle from '@/lib/models/Vehicle';
import Driver from '@/lib/models/Driver';

export async function GET() {
    try {
        await connectToDatabase();
        const trips = await Trip.find({}).sort({ createdAt: -1 });
        return NextResponse.json(trips);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const body = await req.json();
        const { vehicleId, driverId, cargoWeight } = body;

        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });

        const driver = await Driver.findById(driverId);
        if (!driver) return NextResponse.json({ error: 'Driver not found' }, { status: 404 });

        // Rule 1: Cargo Weight
        if (cargoWeight > vehicle.maxLoadCapacity) {
            return NextResponse.json({ error: `Validation Failed: Cargo weight (${cargoWeight} kg) exceeds maximum capacity (${vehicle.maxLoadCapacity} kg).` }, { status: 400 });
        }

        // Rule 2: Vehicle Status
        if (vehicle.status === 'Retired' || vehicle.status === 'In Shop') {
            return NextResponse.json({ error: `Validation Failed: Vehicle is ${vehicle.status} and cannot be assigned.` }, { status: 400 });
        }

        // Rule 3: Driver Status & License
        if (driver.status === 'Suspended') {
            return NextResponse.json({ error: 'Validation Failed: Driver is Suspended.' }, { status: 400 });
        }
        const today = new Date();
        const expiry = new Date(driver.licenseExpiry);
        if (expiry < today) {
            return NextResponse.json({ error: 'Validation Failed: Driver license is expired.' }, { status: 400 });
        }

        // Rule 4: Already On Trip
        if (vehicle.status === 'On Trip' || driver.status === 'On Trip') {
            return NextResponse.json({ error: 'Validation Failed: Driver or Vehicle is already On Trip.' }, { status: 400 });
        }

        const newTrip = await Trip.create({
            ...body,
            status: 'Draft'
        });

        return NextResponse.json(newTrip, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
