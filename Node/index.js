const express = require('express');
require('dotenv').config();
const cors = require('cors');

const userRoutes = require('./src/user-routes');
const respRoutes = require('./src/resp-routes');
const admRoutes = require('./src/adm-routes');

const app = express();

const port = process.env.api_port;

app.use(express.json());

app.use(cors({
    origin: '*',
}));

app.get('/', (req, res) => {
    res.send('Hello gabriel');
});

//User
app.get('/users', userRoutes.getUsers);

app.get('/user', userRoutes.getUserByEmail);

app.get('/situation', userRoutes.getSituation);

//Resp
app.get('/resps', respRoutes.getResp);

app.get('/resp', respRoutes.getRespByEmail);

app.get('/respUser', respRoutes.getUserByResp);

//ADM
app.get('/adms', admRoutes.getADM);

app.get('/adm', admRoutes.getAdmByEmail);

app.listen(port, function() {
    console.log("API iniciando na porta " + port);
})