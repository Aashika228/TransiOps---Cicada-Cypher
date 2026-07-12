const express = require('express');
const router = express.Router();
const FuelLog = require('../models/FuelLog');

router.post('/', async (req, res) => {
    try {
        const { vehicleId, liters, cost, date } = req.body;
        const log = await FuelLog.create({ vehicleId, liters, cost, date });
        res.status(201).json(log);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const filter = {};
        if (req.query.vehicleId) filter.vehicleId = req.query.vehicleId;
        const logs = await FuelLog.find(filter).sort({ date: -1 });
        res.json(logs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;