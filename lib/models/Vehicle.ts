import mongoose from 'mongoose';

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
    }
});

export default mongoose.models.Vehicle || mongoose.model('Vehicle', vehicleSchema);
