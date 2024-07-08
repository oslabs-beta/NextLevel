const fetch = require('node-fetch');

// creating a sendToApi function that will send data to different endpoints
// endpoint for bundle analyzer data, endpoint for build time data
const sendToApi = (data, url) => {
    // check if api key is in the environment variables
    if (!process.env.API_KEY) {
      console.log('API key not found in environment variables');
      return;
    }
    const body = JSON.stringify(data);
    if(navigator.sendBeacon && navigator.sendBeacon(url, body)) {
      return;
    }
    fetch(url, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
        'API-Key': process.env.API_KEY
      },
      keepalive: true
    }).catch(err => {
      console.log('Error sending data to API:', err);
    });
  }

module.exports = { sendToApi };