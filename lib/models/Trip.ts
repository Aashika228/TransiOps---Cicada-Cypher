import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    cargoWeight: { type: Number, required: true },
    plannedDistance: { type: Number, required: true },
    actualDistance: { type: Number, default: null },
    fuelConsumedLiters: { type: Number, default: null },
    fuelCost: { type: Number, default: null },
    status: {
        type: String,
        enum: ['Draft', 'Dispatched', 'Completed', 'Cancelled'],
        default: 'Draft'
    },
    dispatchedAt: { type: Date, default: null },
    completedAt: { type: Date, default: null },
    cancelledAt: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Trip || mongoose.model('Trip', tripSchema);
