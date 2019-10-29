require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const gpiodRoutes = require('./routes/gpiodRoutes');
const requireAuth = require('./middlewares/requireAuth');
const config = require('./config');

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);
app.use(gpiodRoutes);


app.get('/', requireAuth, (req, res) => {
    res.send(`hello there, ${req.userEmail}`);
})

app.listen(config.app.port, () => {
    console.log(`Listening on port ${config.app.port}...`);
})



