//const fetch = require('node-fetch');
//this is for importing commonjs, we need to do es6
// got this line from https://stackoverflow.com/questions/69041454/error-require-of-es-modules-is-not-supported-when-importing-node-fetch
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config({ path: '.env.local' });


// creating a sendToApi function that will send data to different endpoints
// endpoint for bundle analyzer data, endpoint for build time data
const sendToApi = (data, url) => {
    // check if api key is in the environment variables
    if (!process.env.API_KEY) {
      console.log('API key not found in environment variables');
      return;
    }
    const body = JSON.stringify(data);
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