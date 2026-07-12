const express = require('express');
const router = express.Router();
const MaintenanceLog = require('../models/MaintenanceLog');
const Vehicle = require('../models/vehicle');

router.post('/', async (req, res) => {
    try {
        const { vehicleId, issueDescription, cost, date } = req.body;
        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });

        const log = await MaintenanceLog.create({ vehicleId, issueDescription, cost, date });
        vehicle.status = 'In Shop';
        await vehicle.save();

        res.status(201).json(log);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.patch('/:id/close', async (req, res) => {
    try {
        const log = await MaintenanceLog.findById(req.params.id);
        if (!log) return res.status(404).json({ error: 'Log not found' });

        log.status = 'Closed';
        await log.save();

        const vehicle = await Vehicle.findById(log.vehicleId);
        if (vehicle && vehicle.status !== 'Retired') {
            vehicle.status = 'Available';
            await vehicle.save();
        }

        res.json(log);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const filter = {};
        if (req.query.vehicleId) filter.vehicleId = req.query.vehicleId;
        const logs = await MaintenanceLog.find(filter).sort({ date: -1 });
        res.json(logs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;