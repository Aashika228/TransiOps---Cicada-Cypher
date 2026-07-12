const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/maintenance', require('./routes/maintenance'));
app.use('/fuel', require('./routes/fuel'));
app.use('/expenses', require('./routes/expenses'));
app.use('/vehicles', require('./routes/vehicleCost'));
app.use('/reports', require('./routes/reports'));

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));