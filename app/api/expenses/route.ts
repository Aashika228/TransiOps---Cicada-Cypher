import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Expense from '@/lib/models/Expense';

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const { vehicleId, type, cost, date } = await req.json();
        
        const expense = await Expense.create({ vehicleId, type, cost, date });
        
        return NextResponse.json(expense, { status: 201 });
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
        const expenses = await Expense.find(filter).sort({ date: -1 });
        
        return NextResponse.json(expenses);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
