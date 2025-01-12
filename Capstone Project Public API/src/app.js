const express = require('express');
const axios = require('axios');
const app = express();

// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.render('index'); // Homepage for user input
});

app.get('/crypto', async (req, res) => {
    const { currency } = req.query;
    try {
        const response = await axios.get('https://blockchain.info/ticker');
        const rates = response.data;

        if (!rates[currency]) {
            return res.render('error', { message: 'Currency not supported!' });
        }

        res.render('crypto', { currency, rate: rates[currency] });
    } catch (error) {
        console.error(error);
        res.render('error', { message: 'Failed to fetch data. Try again later.' });
    }
});

// Start Server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
