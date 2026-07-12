import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
export const dynamic = 'force-dynamic';
import Driver from '@/lib/models/Driver';

export async function GET() {
    try {
        await connectToDatabase();
        const drivers = await Driver.find({});
        return NextResponse.json(drivers);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const body = await req.json();
        
        const newDriver = await Driver.create(body);
        return NextResponse.json(newDriver, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
