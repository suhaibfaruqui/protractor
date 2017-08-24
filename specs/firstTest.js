var homePage = require('../pages/homePage.js'); 
var testData = require('../test_data/homePageTestData.js')
var using = require('jasmine-data-provider');

xdescribe("Basic Tests", function(){
	 using(testData.urls, function (data) {
		 it("Verify title and URL of DK website for " + data.country, function () {
			 browser.get(data.url);
			 homePage.verifyURL(data.url);
			 homePage.verifyTitle(data.title);
	        });
	    });
});

describe("Verify social websites on NewsLetter", function(){
	 it("Verify Newsletter dropdown box is appearing", function() {
			browser.get(homePage.baseURL);
		    browser.actions().mouseMove(element(by.xpath('//span[@title="Social Icons"]'))).perform()
		    browser.sleep(2000); 
	 });
	 
	 using(testData.socialWebsites, function (data){
		it(data.name, function() {
			browser.actions().mouseMove(element(by.xpath('//span[@title="Social Icons"]'))).perform()
		    browser.sleep(2000);
			 element(by.xpath('//div[contains(@class,"dropdown-menu ddwrap ddwr")]//a[@title="' + data.title + '"]')).click().then(function () {
				 browser.getAllWindowHandles().then(function(handles){
					 homePage.switchWindowAndVerifyURL(data.url);
				 });
			 });
		});
	}); 
});
	
xdescribe("Verify footer links", function() {
	beforeAll(function() {
		browser.get(homePage.baseURL);
	})
	using(testData.footerLinks, function(data){
		it(data.name, function() {
			element(by.xpath('//div[@class = "foot-wrap"]//a[text() = "' + data.name + '"]')).click().then(function() {		
				browser.getAllWindowHandles().then(function(handles){
					if (handles.length > 1) {
						homePage.switchWindowAndVerifyURL(data.url);
					} else {
						homePage.verifyURL(data.url);
						expect(element(by.xpath('//*[text()="' + data.name + '"]')).isPresent()).toBeTruthy();
						browser.navigate().back();
					}					
				});
			});
		});
	});
});



xdescribe("Verify footer links for countries", function() {
	beforeEach(function() {
		browser.get(homePage.baseURL);
		homePage.elements.locationPrompt.isPresent().then(function(result) {
			if(result) {
				homePage.elements.locationPrompt.click().then(function() {
					browser.sleep(1000);
				})				
			}
		})
	})
	
	using(testData.footerLinksCountries, function(data){
		it(data.name, function() {
			element(by.xpath('//div[@class = "foot-wrap"]//a[text() = "' + data.name + '"]')).click().then(function() {		
				browser.getAllWindowHandles().then(function(handles){
					if (handles.length > 1) {
						homePage.switchWindowAndVerifyURL(data.url);
					} else {
						homePage.verifyURL(data.url);
					}					
				});
			});
		});
	});
});

describe("Verify footer buttons for social websites", function() {
	beforeAll(function() {
		browser.get(homePage.baseURL);
	})
	
	using(testData.socialWebsites, function(data) {
		it(data.name, function() {
			element(by.xpath('//*[@class = "fot-soc"]//*[@title="DK on ' + data.name +'"]')).click().then(function() {
				homePage.switchWindowAndVerifyURL(data.url);
			 })
		})
	})
})