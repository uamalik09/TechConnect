const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const OrganizerRouter = require('./Routes/OrganizerRouter');
const ProductRouter = require('./Routes/ProductRouter');
require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;


app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', AuthRouter);
app.use('/organizer', OrganizerRouter);
app.use('/products', AuthRouter);

app.listen(PORT, () => {
    console.log("Server is listening");
});

