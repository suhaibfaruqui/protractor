// An example configuration file.
//var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
//var HtmlReporter = require('protractor-html-screenshot-reporter');
 /*
var reporter = new HtmlScreenshotReporter({
  dest: 'target/screenshots',
  filename: 'my-report.html'
});
*/
exports.config = {
  directConnect: true,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },
  // Framework to use. Jasmine is recommended.
  framework: 'jasmine',

  // Spec patterns are relative to the current working directory when
  // protractor is called.
  specs: ['example_spec.js'],
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
      // Add a screenshot reporter and store screenshots to `/tmp/screnshots`: 
	  var jasmineReporters = require('jasmine-reporters');
	  jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
	      consolidateAll: true,
	      savePath: './results/',
	      filePrefix: 'xmlresults'
	  }));
	  
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
   },
  
  /* 
  onPrepare: function() {
	  jasmine.getEnv().addReporter(reporter);
  },
  */
   /*
  afterLaunch: function(exitCode) {
	  return new Promise(function(resolve){
		  reporter.afterLaunch(resolve.bind(this,exitCode));
	  });
  }
  */
   onComplete: function() {
	     var browserName, browserVersion;
	     var capsPromise = browser.getCapabilities();
	 
	     capsPromise.then(function (caps) {
	        browserName = caps.get('browserName');
	        browserVersion = caps.get('version');
	 
	        var HTMLReport = require('protractor-html-reporter');
	 
	        testConfig = {
	            reportTitle: 'Test Execution Report',
	            outputPath: './results',
	            screenshotPath: 'results/screenshots',
	            testBrowser: browserName,
	            browserVersion: browserVersion,
	            modifiedSuiteName: false,
	            screenshotsOnlyOnFailure: true
	        };
	        new HTMLReport().from('results/xmlresults.xml', testConfig);
	    });
	 }
};
