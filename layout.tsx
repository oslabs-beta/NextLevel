"use client";

import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '86dcce0f-eb1b-4ea1-9000-8623fecbb6cd',
    clientToken: 'pubb355e37074c0e1ed09a909b54bd4f20f',
    // `site` refers to the Datadog site parameter of your organization
    // see https://docs.datadoghq.com/getting_started/site/
    site: 'us5.datadoghq.com',
    service: 'fred-project',
    env: 'demo',
    // Specify a version number to identify the deployed version of your application in Datadog
    // version: '1.0.0',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 20,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: 'mask-user-input',
});
