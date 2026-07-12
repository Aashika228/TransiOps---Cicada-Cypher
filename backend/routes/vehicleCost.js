const express = require('express');
const router = express.Router();
const FuelLog = require('../models/FuelLog');
const MaintenanceLog = require('../models/MaintenanceLog');

router.get('/:id/total-cost', async (req, res) => {
    try {
        const vehicleId = req.params.id;

        const fuelLogs = await FuelLog.find({ vehicleId });
        const maintenanceLogs = await MaintenanceLog.find({ vehicleId });

        const totalFuelCost = fuelLogs.reduce((sum, log) => sum + log.cost, 0);
        const totalMaintenanceCost = maintenanceLogs.reduce((sum, log) => sum + log.cost, 0);

        res.json({
            vehicleId,
            totalFuelCost,
            totalMaintenanceCost,
            totalCost: totalFuelCost + totalMaintenanceCost
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;