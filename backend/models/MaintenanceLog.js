const mongoose = require('mongoose');

const maintenanceLogSchema = new mongoose.Schema({
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    issueDescription: { type: String, required: true },
    cost: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now },
    status: { type: String, enum: ['Open', 'Closed'], default: 'Open' }
});

module.exports = mongoose.model('MaintenanceLog', maintenanceLogSchema);