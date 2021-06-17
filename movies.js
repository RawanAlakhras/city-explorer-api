const axios = require('axios');
module.exports = movies;
let prevMovArray = {};
async function movies(req, res) {
    //res.send('hello')
    let searchQuery = req.query.query;
    let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;


    if (prevMovArray[searchQuery] != undefined) {
        
        console.log('from prevMovArray');
        res.send(prevMovArray[searchQuery]);
    }
    else {
        try {
            const movieResult = await axios.get(movieURL);
            //res.send(movieResult.data.results[0]);
            //console.log(movieResult.data.results[0]);
            console.log(movieResult.data);
            let movieArr = movieResult.data.results.map(item => {
                return new Corresponding(item);
            });
            //console.log('rawan'+movieArr[0].data);
           
            //console.log(movieArr.vote_count)
            prevMovArray[searchQuery] = movieArr;
            console.log('from API');
            res.send(movieArr);
        }
        catch (err) {
            res.status(500).send('Sorry there is error: ' + err)
        }
    }
}


class Corresponding {
    constructor(data) {
        this.title = data.title;
        this.overview = data.overview;
        this.vote_average = data.vote_average;
        this.vote_count = data.vote_count;
        this.imgURL = 'https://image.tmdb.org/t/p/w500' + data.poster_path;
        this.popularity = data.popularity;
        this.release_date = data.release_date;
    }
}

