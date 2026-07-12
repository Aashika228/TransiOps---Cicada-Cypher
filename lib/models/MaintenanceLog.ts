import mongoose from 'mongoose';

const maintenanceLogSchema = new mongoose.Schema({
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    issueDescription: { type: String, required: true },
    cost: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now },
    status: { type: String, enum: ['Open', 'Closed'], default: 'Open' }
});

export default mongoose.models.MaintenanceLog || mongoose.model('MaintenanceLog', maintenanceLogSchema);
