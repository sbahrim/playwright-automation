import {PlaywrightTestConfig} from '@playwright/test'

const config: PlaywrightTestConfig = {
    timeout: 60000, //how long until tests failed if no input
    retries: 0, //how many times to re-run failing tests
    testDir:'tests/visual',
    use: {
        headless: true,
        viewport: { width: 1280,height:720},
        actionTimeout: 15000,
        ignoreHTTPSErrors: true,
        video: 'off',
        screenshot: 'off',
    },
    projects:[
        {
            name:'Chromium',
            use: { browserName: 'chromium'},
        },
        {
            name:'Firefox',
            use: { browserName: 'firefox'},
        },
        {
            name:'Webkit',
            use: { browserName: 'webkit'},
        },
    ],
}

export default config