const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

router.post('/', async (req, res) => {
    try {
        const { vehicleId, type, cost, date } = req.body;
        const expense = await Expense.create({ vehicleId, type, cost, date });
        res.status(201).json(expense);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const filter = {};
        if (req.query.vehicleId) filter.vehicleId = req.query.vehicleId;
        const expenses = await Expense.find(filter).sort({ date: -1 });
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;