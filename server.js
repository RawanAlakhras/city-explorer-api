const express = require('express');
const cors = require('cors');
const axios = require('axios');
require("dotenv").config();
const server = express();
const PORT = process.env.PORT;
const weatherjson = require('./data/weather.json');
server.use(cors()); //mack my server open for everyone

class Forecast {
    constructor(date) {
        this.date = date.valid_date;
        this.description = `Low of ${date.low_temp}, high of ${date.max_temp}, with ${date.weather.description}`
    }
}

class Corresponding {
    constructor(data) {
        this.title = data.title;
        this.overview = data.overview;
        this.vote_average=data.vote_average;
        this.vote_count=data.vote_count;
        this.imgURL='https://image.tmdb.org/t/p/w500'+data.poster_path;
        this.popularity=data.popularity;
        this.release_date=data.release_date;
    }
}



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
server.get('/movie',movie);

async function movie(req,res){
    //res.send('hello')
    let searchQuery = req.query.searchQuery;
    try{
        let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
        const movieResult = await axios.get(movieURL);
        //res.send(movieResult.data.results[0]);
        //console.log(movieResult.data.results[0]);
        let movieArr= movieResult.data.results.map(item => {
            return(new Corresponding(item));
        });
        //console.log('rawan'+movieArr[0].data);
        res.send(movieArr);
        //console.log(movieArr.vote_count)
    }catch (err) {
        res.status(500).send('Sorry there is error: ' + err)
    }
}

async function weather(req, res) {
    //res.send('hello');
    let searchQuery = req.query.searchQuery;
    let latQuery = req.query.latQuery;
    let lonQuery = req.query.lonQuery;
    try {
        let requestURL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery}&key=${process.env.WEATHER_API_KEY}`;
       
        const result = await axios.get(requestURL);
        
        //res.send(result.data);
       
        
        let objArr= result.data.data.map(day => {
            return(new Forecast(day));
        })
        res.send(objArr);
        //console.log('rawan'+objArr[0]);
    } catch (err) {
        res.status(500).send('Sorry there is error: ' + err)
    }

    /* axios.get(requestURL).then(days => {
        let objArr = [];
        days.map(day => {
            objArr.push(new Forecast(day.data.valid_date, day.data.weather.description));
    
        });
        console.log(objArr);
    }) */

    /*  let getweather=weatherjson.map((element)=>{
        //res.send(element.weather);
        return element.city_name.data;
    })
    console.log(getweather);  */
}

server.listen(PORT, () => {
    console.log(`listen in port ${PORT} `);
});

//localhost:3001 ...
server.get('*', (req, res) => {
    res.status(404).send('page not found');
})

