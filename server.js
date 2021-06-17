const express = require('express');
const cors = require('cors');
const axios = require('axios');
const weather=require('./weather.js');
const movies=require('./movies');
require("dotenv").config();
const server = express();
const PORT = process.env.PORT;
const weatherjson = require('./data/weather.json');
server.use(cors()); //mack my server open for everyone





//req:request ,res:respons

//localhost:3001/
server.get('/', (req, res) => {
    res.send('i am in the root rout');
});



//localhost:3001/test
server.get('/test', (req, res) => {
    res.send('hello');

});



//localhost:3001/weather
server.get('/weather', weather);
server.get('/movie', movies);



server.listen(PORT, () => {
    console.log(`listen in port ${PORT} `);
});

//localhost:3001 ...
server.get('*', (req, res) => {
    res.status(404).send('page not found');
})

