#!/usr/bin/env node
// makes this the entry point for command line argument

const { sendToApi } = require('./sendToApi');
const { spawn } = require('child_process');

const bundleBuildAnalyzer = () => {

  const buildURL = `https://www.nextlevel-dash.com/dashboard/api/build`;
  const bundleURL = `https://www.nextlevel-dash.com/dashboard/api/bundle`;

  const command = 'next';
  const args = ['build'];
  const env = { ...process.env, ANALYZE: 'true' };
  const startTime = Date.now(); // start time before execution

  const buildProcess = spawn(command, args, { env });

  let bundleLog = ''; // capture bundle analyzer metrics

  buildProcess.stdout.on('data', (data) => {
    console.log(data.toString());
    bundleLog += data.toString();
  });

  // if error in the build process
  buildProcess.stderr.on('data', (data) => {
    console.error(data.toString());
  });

  buildProcess.on('close', (code) => {
    // use at the end of build process, if code != 0 then there was an error
    if (code !== 0) {
      console.error(`Build process exited with code ${code}`);
      return;
    }
    const endTime = Date.now(); // End time after execution has finished
    const buildTime = endTime - startTime;
    console.log('Build time:', buildTime);
    sendToApi({ buildTime }, buildURL);

    //sendinig whole bundle log to api
    sendToApi({ bundleLog }, bundleURL);
  });
}

bundleBuildAnalyzer();