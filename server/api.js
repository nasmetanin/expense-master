const express = require('express');
const router = express.Router();
const { readDB, writeDB, response } = require('./db.js');

// Handle API endpoints
router.get('/data', (req, res) => {
    const db = readDB();
    res.json(db);
});

router.delete('/data/:id', (req, res) => {
    const db = readDB();
    const id = Number.parseInt(req.params.id);
    if (!db.success) {
        res.status(404).json(response(false, null, 'Database not found'));
        return;
    }
    let data = db.data;
    // filter expense with the given id
    data.expenses = data.expenses.filter(item => item.id !== id);

    writeDB(data) ?
        res.json(response(true, db))
        :
        res.status(500).json(response(false, null, 'Failed to write to database'));
});

router.post('/data', (req, res) => {
    const db = readDB();
    const data = req.body;

    if (!db.success) {
        res.status(404).json(response(false, null, 'Database not found'));
        return;
    }

    if (!data) {
        res.status(400).json(response(false, null, 'No data provided'));
        return;
    }
    db.data.idCounter++;
    data.id = db.data.idCounter;
    db.data.expenses.push(data);
    writeDB(db.data) ?
        res.json(response(true, db.data.expenses))
        :
        res.status(500).json(response(false, null, 'Failed to write to database'));
});

router.put('/data/:id', (req, res) => {

    const db = readDB();
    const id = Number.parseInt(req.params.id);

    if (!db.success) {
        res.status(404).json(response(false, null, 'Database not found'));
        return;
    }

    if (!req.body) {
        res.status(400).json(response(false, null, 'No data provided'));
        return;
    }
    let data = db.data;
    // find expense with the given id
    let expense = data.expenses.find(item => item.id === id);
    if (!expense) {
        res.status(404).json(response(false, null, 'Expense not found'));
        return;
    }
    // update expense
    expense.description = req.body.description;
    expense.amount = req.body.amount;
    expense.date = req.body.date;

    writeDB(data) ?
        res.json(response(true, db.data.expenses))
        :
        res.status(500).json(response(false, null, 'Failed to write to database'));
});


module.exports = router;
