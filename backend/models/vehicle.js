const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    registrationNumber: { type: String, required: true, unique: true },
    name: String,
    type: String,
    maxLoadCapacity: Number,
    odometer: Number,
    acquisitionCost: Number,
    revenue: { type: Number, default: 0 },
    status: {
        type: String,
        enum: ['Available', 'On Trip', 'In Shop', 'Retired'],
        default: 'Available'
    },
    revenue: { type: Number, default: 0 }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);