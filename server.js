const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
const apiKey = process.env.API_KEY;
app.use(cors());
app.use(bodyParser.json());

let weatherList = [];

app.get('/api/weather', (request, response, next) => {
    const isInWeatherList = weatherList.reduce((bool, weather) => {
        //loop through weatherList 
        if (weather.name.toLowerCase() === request.query.city.toLowerCase()) {
            //set bool to true 
            bool = true;
        }
        return bool
    }, false)

    if (!isInWeatherList) {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${request.query.city}&APPID=${apiKey}`)
            .then((weather) => {
                weather.data.main.temp = ((weather.data.main.temp - 273.15) * 1.8000 + 32.00).toFixed(0);
                weatherList.push(weather.data)
                response.send(weatherList)
            })
            .catch((err) => {
                response.send(err.response.data)
            })
    } else {
        response.send(weatherList);
    }
})

app.delete('/api/weather', (req, res, next) => {
    weatherList = weatherList.filter((weather) => {
        return weather.name.toLowerCase() != req.query.city.toLowerCase()
    })
    res.send(weatherList)
})

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})


