import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Vehicle from '@/lib/models/Vehicle';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await connectToDatabase();
        const { id } = params;
        
        const vehicle = await Vehicle.findById(id);
        if (!vehicle) return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
        
        if (vehicle.status === 'On Trip') {
            return NextResponse.json({ error: 'Cannot delete a vehicle that is currently On Trip' }, { status: 400 });
        }

        await Vehicle.findByIdAndDelete(id);
        
        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
