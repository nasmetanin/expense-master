const express = require('express');
const path = require('path');
const apiRoutes = require('./api');
const app = express();
const port = 3000;
const staticPath = path.resolve(__dirname, '../www');

app.use(express.json()); // for parsing application/json
app.use('/api', apiRoutes); // api routes handler

// Serve static files
app.use(express.static(staticPath));

app.get('*', (req, res) => {
    const indexPath = path.resolve(staticPath, 'index.html');
    res.sendFile(indexPath);
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
