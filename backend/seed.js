const mongoose = require('mongoose');
const Vehicle = require('./models/vehicle');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
    await Vehicle.create([
        { registrationNumber: 'MH12AB1234', name: 'Truck A', type: 'Truck', maxLoadCapacity: 5000, odometer: 12000, acquisitionCost: 800000, revenue: 15000, status: 'Available' },
        { registrationNumber: 'MH12CD5678', name: 'Van B', type: 'Van', maxLoadCapacity: 2000, odometer: 8000, acquisitionCost: 450000, revenue: 2000, status: 'Available' }
    ]);
    console.log('Seeded!');
    process.exit();
});