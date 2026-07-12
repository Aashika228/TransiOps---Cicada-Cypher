const express = require('express');
const router = express.Router();
const Vehicle = require('../models/vehicle');
const FuelLog = require('../models/FuelLog');
const MaintenanceLog = require('../models/MaintenanceLog');

router.get('/summary', async (req, res) => {
    try {
        const vehicles = await Vehicle.find();

        const summary = await Promise.all(vehicles.map(async (vehicle) => {
            const fuelLogs = await FuelLog.find({ vehicleId: vehicle._id });
            const maintenanceLogs = await MaintenanceLog.find({ vehicleId: vehicle._id });

            const totalFuelLiters = fuelLogs.reduce((sum, f) => sum + f.liters, 0);
            const totalFuelCost = fuelLogs.reduce((sum, f) => sum + f.cost, 0);
            const totalMaintenanceCost = maintenanceLogs.reduce((sum, m) => sum + m.cost, 0);
            
            // Note: depends on the Trip Management teammate's module for actual distance
            const totalDistance = 0; 

            const operationalCost = totalFuelCost + totalMaintenanceCost;

            const fuelEfficiency = totalFuelLiters > 0
                ? totalDistance / totalFuelLiters
                : null;

            const roi = vehicle.acquisitionCost > 0
                ? (vehicle.revenue - operationalCost) / vehicle.acquisitionCost
                : null;

            return {
                vehicleId: vehicle._id,
                registrationNumber: vehicle.registrationNumber,
                name: vehicle.name,
                fuelEfficiency,
                operationalCost,
                revenue: vehicle.revenue,
                roi
            };
        }));

        res.json(summary);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;