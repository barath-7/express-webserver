const request = require("postman-request");
require("dotenv").config();
const { WEATHER_BASE_URL } = process.env;

const getWeather = (latitude, longitude, callback) => {
  let url =
    WEATHER_BASE_URL +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude);
    //&units=f need to add in above line
    
  request({ url: url, json: true }, (err, res) => {
    if (err) {
      callback(
        "Unable to access weather api. Check your network connection",
        undefined
      );
      return;
    }
    let data = res.body;
    if (data.error) {
      callback("Unable to find location, enter valid location", undefined);
      return;
    }
    let description = data.current.weather_descriptions[0];
    let temperature = data.current.temperature;
    let feelsLike = data.current.feelslike;
    let precipitation = data.current.precip;
    let location = `${data.location.name} ${data.location.region} ${data.location.country}`
    callback(undefined,`${description}.Is is ${temperature} degrees out there, but it feels more like ${feelsLike}`)
    // callback(undefined, {
    //   description,
    //   temperature,
    //   feelsLike,
    //   precipitation,
    //   // location:location
    // });
  });
};

module.exports = getWeather;
