// configuration file

var configuration = require('./configuration.js');
var specsToRun = 'specs/' + configuration.property.specs;
var browserToUse = configuration.property.browser;

exports.config = {
	directConnect: true,
  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': browserToUse
  },
  // Framework to use. Jasmine is recommended.
  framework: 'jasmine2',
  // Spec patterns are relative to the current working directory when
  specs: [specsToRun],
//  multiCapabilities: [{
//	  browserName: 'firefox'
//	  }, {
//	  browserName: 'chrome'
//	  }],

  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  },
  /*
  beforeLaunch: function() {
	  return new Promise(function(resolve){
		  reporter.beforeLaunch(resolve);
	  })
  },
  */
  onPrepare: function() {
	  browser.ignoreSynchronization = true;
      // Add a screenshot reporter and store screenshots to `/tmp/screnshots`:	  
	  var utilities = require('./utilities.js')
	  //Navigate to base URL and remove prompt
	   browser.get(utilities.baseURL).then(function() {
		   utilities.removeLocationPrompt();
		   //browser.manage().window().maximize();
	   })
	  //jasmine.DEFAULT_TIMEOUT_INTERVAL = 400000;
	  //for running on non-angular sites
	  
	  var jasmineReporters = require('jasmine-reporters');
	  jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter ({
	      consolidateAll: true,
	      savePath: './results/',
	      filePrefix: 'xmlresults'
	  }));
//	  var AllureReporter = require('jasmine-allure-reporter');
//	    jasmine.getEnv().addReporter(new AllureReporter({
//	      resultsDir: 'allure-results'
//	    }));
	  var fs = require('fs-extra');
	  
	  fs.emptyDir('results/screenshots/', function (err) {
	          console.log(err);
	      });
	   
	      jasmine.getEnv().addReporter({
	          specDone: function(result) {
	              if (result.status == 'failed') {
	                  browser.getCapabilities().then(function (caps) {
	                      var browserName = caps.get('browserName');
	   
	                      browser.takeScreenshot().then(function (png) {
	                          var stream = fs.createWriteStream('results/screenshots/' + browserName + '-' + result.fullName+ '.png');
	                          stream.write(new Buffer(png, 'base64'));
	                          stream.end();
	                      });
	                  });
	              }
	          }
	      });  
	      return browser.manage().window().maximize()
   },
   params: {
		  baseURL: "https://www.dk.com/uk/",
   },
   onComplete: function() {
	     var browserName, browserVersion;
	     var capsPromise = browser.getCapabilities();
	 
	     capsPromise.then(function (caps) {
	        browserName = caps.get('browserName');
	        browserVersion = caps.get('version');
	 
	        var HTMLReport = require('protractor-html-reporter');
	 
	        testConfig = {
	            reportTitle: 'r',
	            outputPath: './results',
	            screenshotPath: 'screenshots',
	            testBrowser: browserName,
	            browserVersion: browserVersion,
	            modifiedSuiteName: false,
	            screenshotsOnlyOnFailure: true
	        };
	        new HTMLReport().from('results/xmlresults.xml', testConfig);
	    });
	     //open report browser
	 }
};
