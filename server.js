const express = require('express');
const server =express();
const PORT = 3001;
const weatherjson=require('./data/weather.json');

//req:request ,res:respons

//localhost:3001/
server.get('/',(req,res)=>{
    res.send('i am in the root rout');
});



//localhost:3001/test
server.get('/test',(req,res)=>{
    res.send('hello');

});



//localhost:3001/weather
server.get('/weather',(req,res)=>{
    //res.send('hello');

     let getweather=weatherjson.data.map((element)=>{
        //res.send(element.weather);
        return element.weather.description;
    })
    console.log(getweather); 
});

server.listen(PORT,()=>{
    console.log(`listen in port ${PORT} `);
});
//localhost:3001 ...
server.get('*',(req,res)=>{
    res.status(404).send('page not found');
});