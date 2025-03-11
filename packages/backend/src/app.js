const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const socialRoutes = require('./routes/socialRoutes');
const linkRoutes = require('./routes/linkRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const settingRoute = require('./routes/settingRoutes');
const profileRoute = require('./routes/profileRoute');
const adminRoutes = require('./routes/adminRoutes');
require("./cronjobs")
const app = express();
// enable cors
app.use(cors());
app.use(express.static('public'));
app.options('*', cors());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// parse json request body
app.use(express.json());
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/social', socialRoutes);
app.use('/api/v1/links', linkRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/settings', settingRoute);
app.use('/api/v1/profiles', profileRoute);
app.use('/api/v1/admin', adminRoutes);
app.get('/api/v1/test', async (req, res) => {
    res.status(200).send('Congratulations! API is working!');
});


require('pg').defaults.parseInt8 = true;

module.exports = app;
