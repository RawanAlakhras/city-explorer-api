const axios=require('axios');
module.exports = weather;



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

class Forecast {
    constructor(date) {
        this.date = date.valid_date;
        this.description = `Low of ${date.low_temp}, high of ${date.max_temp}, with ${date.weather.description}`
    }
}