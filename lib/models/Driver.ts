import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    licenseNumber: { type: String, required: true, unique: true },
    licenseCategory: { type: String, required: true },
    licenseExpiry: { type: Date, required: true },
    phone: { type: String, required: true },
    safetyScore: { type: Number, default: 100 },
    currentLocation: { type: String, default: '-' },
    status: {
        type: String,
        enum: ['Available', 'On Trip', 'Off Duty', 'Suspended'],
        default: 'Available'
    }
});

export default mongoose.models.Driver || mongoose.model('Driver', driverSchema);
