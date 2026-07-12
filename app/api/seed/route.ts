import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Driver from '@/lib/models/Driver';
import Vehicle from '@/lib/models/Vehicle';
import Trip from '@/lib/models/Trip';
import Expense from '@/lib/models/Expense';
import Role from '@/lib/models/Role';
import User from '@/lib/models/User';

export async function GET() {
    try {
        await connectToDatabase();
        
        // Clear existing data
        await Driver.deleteMany({});
        await Vehicle.deleteMany({});
        await Trip.deleteMany({});
        await Expense.deleteMany({});
        await Role.deleteMany({});
        await User.deleteMany({});

        // Seed Roles & Users
        const adminRole = await Role.create({ name: 'Admin', permissions: ['all'], description: 'System Administrator' });
        await User.create({ name: 'Admin User', email: 'admin@transitops.com', password: 'password123', roleId: adminRole._id });

        // Seed 15 Drivers
        const driverData = [
            { name: 'Alex Johnson', licenseNumber: 'DL-9938-XYZ', licenseCategory: 'Heavy Commercial (HGMV)', licenseExpiry: '2027-05-12', phone: '+91 9876543210', safetyScore: 92, status: 'Available' },
            { name: 'Sarah Connor', licenseNumber: 'DL-4432-ABC', licenseCategory: 'Light Commercial (LGMV)', licenseExpiry: '2025-11-20', phone: '+91 9876543211', safetyScore: 88, status: 'Available' },
            { name: 'Rahul Sharma', licenseNumber: 'MH-1234-XYZ', licenseCategory: 'Heavy Commercial (HGMV)', licenseExpiry: '2026-08-15', phone: '+91 9876543212', safetyScore: 95, status: 'Available' },
            { name: 'Vikram Singh', licenseNumber: 'MH-5678-ABC', licenseCategory: 'Medium Commercial (MGMV)', licenseExpiry: '2025-02-10', phone: '+91 9876543213', safetyScore: 78, status: 'Available' },
            { name: 'Priya Patel', licenseNumber: 'GJ-9012-PQR', licenseCategory: 'Light Commercial (LGMV)', licenseExpiry: '2028-12-05', phone: '+91 9876543214', safetyScore: 99, status: 'Available' },
            { name: 'Arjun Desai', licenseNumber: 'GJ-3456-STU', licenseCategory: 'Heavy Commercial (HGMV)', licenseExpiry: '2026-06-22', phone: '+91 9876543215', safetyScore: 85, status: 'Available' },
            { name: 'Kavita Reddy', licenseNumber: 'KA-7890-VWX', licenseCategory: 'Medium Commercial (MGMV)', licenseExpiry: '2027-01-30', phone: '+91 9876543216', safetyScore: 91, status: 'Available' },
            { name: 'Manoj Kumar', licenseNumber: 'KA-1234-YZA', licenseCategory: 'Heavy Commercial (HGMV)', licenseExpiry: '2025-09-18', phone: '+91 9876543217', safetyScore: 82, status: 'Available' },
            { name: 'Deepa Iyer', licenseNumber: 'TN-5678-BCD', licenseCategory: 'Light Commercial (LGMV)', licenseExpiry: '2028-04-25', phone: '+91 9876543218', safetyScore: 96, status: 'Available' },
            { name: 'Ravi Verma', licenseNumber: 'TN-9012-EFG', licenseCategory: 'Medium Commercial (MGMV)', licenseExpiry: '2026-11-12', phone: '+91 9876543219', safetyScore: 75, status: 'Available' },
            { name: 'Sneha Joshi', licenseNumber: 'UP-3456-HIJ', licenseCategory: 'Light Commercial (LGMV)', licenseExpiry: '2027-08-08', phone: '+91 9876543220', safetyScore: 94, status: 'Available' },
            { name: 'Amitabh Bachchan', licenseNumber: 'UP-7890-KLM', licenseCategory: 'Heavy Commercial (HGMV)', licenseExpiry: '2025-05-05', phone: '+91 9876543221', safetyScore: 89, status: 'Available' },
            { name: 'Anjali Gupta', licenseNumber: 'MP-1234-NOP', licenseCategory: 'Medium Commercial (MGMV)', licenseExpiry: '2028-02-14', phone: '+91 9876543222', safetyScore: 97, status: 'Available' },
            { name: 'Rajesh Khanna', licenseNumber: 'MP-5678-QRS', licenseCategory: 'Heavy Commercial (HGMV)', licenseExpiry: '2026-10-31', phone: '+91 9876543223', safetyScore: 81, status: 'Available' },
            { name: 'Neha Sharma', licenseNumber: 'RJ-9012-TUV', licenseCategory: 'Light Commercial (LGMV)', licenseExpiry: '2027-07-19', phone: '+91 9876543224', safetyScore: 93, status: 'Available' }
        ];
        const drivers = await Driver.insertMany(driverData);
        
        const vehicleData = [
            { registrationNumber: 'MH-04-1111', name: 'Tata Ace Gold 1', type: 'Light Duty', maxLoadCapacity: 750, odometer: 12500, status: 'Available', acquisitionCost: 450000, currentLocation: 'Andheri East, Mumbai' },
            { registrationNumber: 'DL-01-2222', name: 'Ashok Leyland Dost 1', type: 'Medium Duty', maxLoadCapacity: 1250, odometer: 34200, status: 'Available', acquisitionCost: 750000, currentLocation: 'Connaught Place, New Delhi' },
            { registrationNumber: 'MH-12-3333', name: 'Tata Prima 1', type: 'Heavy Duty', maxLoadCapacity: 40000, odometer: 156000, status: 'Available', acquisitionCost: 4500000, currentLocation: 'Hinjewadi IT Park, Pune' },
            { registrationNumber: 'MH-14-4444', name: 'Mahindra Bolero Pickup', type: 'Light Duty', maxLoadCapacity: 1000, odometer: 45000, status: 'Available', acquisitionCost: 850000, currentLocation: 'Pimpri-Chinchwad, Pune' },
            { registrationNumber: 'GJ-01-5555', name: 'Eicher Pro 2049', type: 'Medium Duty', maxLoadCapacity: 2500, odometer: 28000, status: 'Available', acquisitionCost: 1200000, currentLocation: 'SG Highway, Ahmedabad' },
            { registrationNumber: 'GJ-05-6666', name: 'Volvo FM 400', type: 'Heavy Duty', maxLoadCapacity: 35000, odometer: 210000, status: 'Available', acquisitionCost: 6500000, currentLocation: 'Hazira Port, Surat' },
            { registrationNumber: 'KA-01-7777', name: 'Tata Intra V30', type: 'Light Duty', maxLoadCapacity: 1300, odometer: 18000, status: 'Available', acquisitionCost: 900000, currentLocation: 'Electronic City, Bengaluru' },
            { registrationNumber: 'KA-03-8888', name: 'BharatBenz 1215R', type: 'Medium Duty', maxLoadCapacity: 12000, odometer: 65000, status: 'Available', acquisitionCost: 2200000, currentLocation: 'Whitefield, Bengaluru' },
            { registrationNumber: 'TN-01-9999', name: 'Scania R500', type: 'Heavy Duty', maxLoadCapacity: 40000, odometer: 320000, status: 'Available', acquisitionCost: 7500000, currentLocation: 'Chennai Port, Chennai' },
            { registrationNumber: 'TN-09-1010', name: 'Ashok Leyland BADA DOST', type: 'Light Duty', maxLoadCapacity: 1500, odometer: 22000, status: 'Available', acquisitionCost: 1050000, currentLocation: 'Guindy Industrial Estate, Chennai' },
            { registrationNumber: 'UP-32-1212', name: 'Tata 1109g LPT', type: 'Medium Duty', maxLoadCapacity: 11000, odometer: 54000, status: 'Available', acquisitionCost: 1800000, currentLocation: 'Gomti Nagar, Lucknow' },
            { registrationNumber: 'UP-78-1313', name: 'Mahindra Blazo X 42', type: 'Heavy Duty', maxLoadCapacity: 42000, odometer: 185000, status: 'Available', acquisitionCost: 3800000, currentLocation: 'Transport Nagar, Kanpur' },
            { registrationNumber: 'MP-04-1414', name: 'Maruti Suzuki Super Carry', type: 'Light Duty', maxLoadCapacity: 600, odometer: 12000, status: 'Available', acquisitionCost: 550000, currentLocation: 'MP Nagar, Bhopal' },
            { registrationNumber: 'MP-09-1515', name: 'Eicher Pro 3015', type: 'Medium Duty', maxLoadCapacity: 15000, odometer: 88000, status: 'Available', acquisitionCost: 2400000, currentLocation: 'Vijay Nagar, Indore' },
            { registrationNumber: 'RJ-14-1616', name: 'Tata Signa 5525.S', type: 'Heavy Duty', maxLoadCapacity: 55000, odometer: 142000, status: 'Available', acquisitionCost: 4200000, currentLocation: 'Sitapura Industrial Area, Jaipur' }
        ];
        const vehicles = await Vehicle.insertMany(vehicleData);

        // Seed 3-4 Expenses for every vehicle
        const expenseTypes = ['Fuel', 'Maintenance', 'Toll', 'Insurance', 'Cleaning'];
        const expensesData = [];
        
        for (const vehicle of vehicles) {
            const numExpenses = Math.floor(Math.random() * 2) + 3; // 3 or 4
            for (let i = 0; i < numExpenses; i++) {
                const randomType = expenseTypes[Math.floor(Math.random() * expenseTypes.length)];
                let cost = 0;
                if (randomType === 'Fuel') cost = Math.floor(Math.random() * 5000) + 1500;
                else if (randomType === 'Maintenance') cost = Math.floor(Math.random() * 20000) + 5000;
                else if (randomType === 'Toll') cost = Math.floor(Math.random() * 800) + 200;
                else cost = Math.floor(Math.random() * 10000) + 1000;
                
                // Random date within last 30 days
                const date = new Date();
                date.setDate(date.getDate() - Math.floor(Math.random() * 30));

                expensesData.push({
                    vehicleId: vehicle._id,
                    type: randomType,
                    cost,
                    date
                });
            }
        }
        await Expense.insertMany(expensesData);

        return NextResponse.json({ success: true, message: 'Seeded 15 drivers, 15 vehicles, and ' + expensesData.length + ' expenses!' });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
