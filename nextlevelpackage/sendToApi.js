const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config({ path: '.env.local' });


// creating a sendToApi function that will send data to different endpoints
// endpoint for bundle analyzer data, endpoint for build time data
const sendToApi = (data, url) => {
    // check if api key is in the environment variables
    if (!process.env.NEXT_PUBLIC_API_KEY) {
      console.log('API key not found in environment variables');
      return;
    } 
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const body = JSON.stringify(data);
    fetch(url, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey
      },
      keepalive: true
    }).catch(err => {
      console.log('Error sending data to server:', err);
    });
  }

module.exports = { sendToApi };