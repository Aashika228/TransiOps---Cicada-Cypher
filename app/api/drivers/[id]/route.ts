import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Driver from '@/lib/models/Driver';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await connectToDatabase();
        const { id } = params;
        
        const driver = await Driver.findById(id);
        if (!driver) return NextResponse.json({ error: 'Driver not found' }, { status: 404 });
        
        if (driver.status === 'On Trip') {
            return NextResponse.json({ error: 'Cannot delete a driver that is currently On Trip' }, { status: 400 });
        }

        await Driver.findByIdAndDelete(id);
        
        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
