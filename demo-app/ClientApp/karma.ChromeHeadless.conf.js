// This Karma configuration file to be used when running unit tests in a Docker container.
// It uses the "headless" Chromium browser, runs once and then exits.

// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

// Following 2 line required if you want to use "headless" chrome (acutally Chromium).
const puppeteer = require('puppeteer');
process.env.CHROME_BIN = puppeteer.executablePath();
//const isDocker = require('is-docker');

module.exports = function (config) {
  config.set({
    basePath: '',
    //frameworks: ['jasmine', '@angular/cli'],
	frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      //require('@angular/cli/plugins/karma'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, 'coverage'), reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },

    reporters: ['progress', 'kjhtml'],


//    port: 9876,
//    colors: true,
//    logLevel: config.LOG_INFO,
//    autoWatch: true,
//    customLaunchers: {
//      'HeadlessChrome': {
//        base: 'ChromeHeadless',
//        flags: [
////          '--headless',
//         '--remote-debugging-port=9222',
//          '--no-sandbox',
////          "--max_old_space_size=4096",
////          "--disable-gpu"
//        ],
//      }
//    },
//    browsers: ['HeadlessChrome'],


    // The configuration below came from the following website:
    // https://github.com/karma-runner/karma/issues/2652
    // It is the only configuration that actually worked everytinme.
    captureTimeout: 10000,
    browserDisconnectTolerance: 1,
    browserDisconnectTimeout: 210000,
    browserNoActivityTimeout: 210000,
    port: 9876,
    colors: true,
//    logLevel: config.LOG_INFO,
    logLevel: config.LOG_DEBUG,
    autoWatch: true,
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
//        base: 'Chrome',
        flags: [
          '--no-sandbox',
          '--disable-gpu',
		  '--headless',
          //'--enable-logging',                     // Don't use this flag because it causes console windows to be displayed.
          '--no-default-browser-check',
          '--no-first-run',
          '--disable-default-apps',
          '--disable-popup-blocking',
          '--disable-translate',
          '--disable-background-timer-throttling',
          '--disable-renderer-backgrounding',
          '--disable-device-discovery-notifications',
          '--remote-debugging-port=9222',
          '--disable-web-security'
        ]
      }
    },
    singleRun: true,
  });
};
