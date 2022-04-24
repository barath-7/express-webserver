const request = require("postman-request");
require('dotenv').config()
const { GEOCODE_BASE_URL, GEOCODE_ACCESS_KEY } = process.env;

const getGeocode = (address, callback) => {
  let url = GEOCODE_BASE_URL + encodeURIComponent(address) + GEOCODE_ACCESS_KEY;
  request({ url: url, json: true }, (err, res) => {
    if (err) {
      callback(
        "Unable connect to geocoding api. Please check your internet connection.",
        undefined
      );
      return;
    }
    let data = res.body;
    if (data.features.length === 0) {
      callback("Unable to find the latitude and longitude", undefined);
      return;
    }
    let location = data.features[0].place_name;
    let latitude = data.features[0].center[1];
    let longitude = data.features[0].center[0];
    callback(undefined, {
      latitude,
      longitude,
      location,
    });
  });
};

module.exports = getGeocode;
