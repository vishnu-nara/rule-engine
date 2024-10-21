const express = require('express');
const cors = require('cors');
const ruleController = require('./ruleController');
const { initDB } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json()); // To parse JSON request bodies
app.use('/api', ruleController);

initDB();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
