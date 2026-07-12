import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    type: { type: String, required: true },
    cost: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now }
});

export default mongoose.models.Expense || mongoose.model('Expense', expenseSchema);
