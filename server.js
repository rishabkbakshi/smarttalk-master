const express = require('express');
const http = require('http');
const https = require('https');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4009;

app.use(express.static('src'));
app.listen(PORT, () => { console.log(`Server active on http://localhost:${PORT}/`); });
