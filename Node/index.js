const express = require('express');
require('dotenv').config();
const cors = require('cors');

const userRoutes = require('./src/user-routes');

const app = express();

const port = process.env.api_port;

app.use(express.json());

app.use(cors({
    origin: '*',
}));

app.get('/', (req, res) => {
    res.send('Hello gabriel');
});

app.get('/users', userRoutes.getUsers);

app.get('/user', userRoutes.getUserByEmail);

app.get('/situation', userRoutes.getSituation);

app.listen(port, function() {
    console.log("API iniciando na porta " + port);
})