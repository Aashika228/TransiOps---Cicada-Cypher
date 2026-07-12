import mongoose from 'mongoose';

const fuelLogSchema = new mongoose.Schema({
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    liters: { type: Number, required: true },
    cost: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now }
});

export default mongoose.models.FuelLog || mongoose.model('FuelLog', fuelLogSchema);
