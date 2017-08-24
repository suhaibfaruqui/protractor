'use strict';  
module.exports = {
	locationPrompt: browser.element(by.xpath('//*[text() = "Ignore and continue"]')),
	baseURL: "https://www.dk.com/uk/",
	
	elements: {
		noThanksButton: element(by.xpath("//a[text()='No, thanks!']")),
	},
	
	openUrlAndRemovePrompt: function(url) {
		browser.get(url);
		this.removeLocationPrompt();
	},

	removeLocationPrompt:	function() {
		this.locationPrompt.isPresent().then(function(result) {
			if(result) {
				this.locationPrompt.click().then(function() {
					browser.sleep(1000);
				}.bind(this))				
			}
		}.bind(this))
	},
	
	openBaseUrlAndRemovePrompt: function() {
		browser.get(this.baseURL);
		this.removeLocationPrompt();
	},
	
	switchWindowAndVerifyURL: function(websiteURL) {
		browser.getAllWindowHandles().then(function(handles){
		    browser.switchTo().window(handles[1]).then(function(){
		    	this.verifyURL(websiteURL);       	
		    }.bind(this));
		    browser.close();
		    browser.switchTo().window(handles[0]);
		}.bind(this))
	},
	
	verifyURL: function(websiteURL) {
		browser.getCurrentUrl().then(function (url) {
        	expect(url).toEqual(websiteURL);
        })
	},
	
	removeJoinNewsletterPrompt:	function() {
		this.elements.noThanksButton.isPresent().then(function(result) {
			if(result) {
				this.elements.noThanksButton.click().then(function() {
					browser.sleep(1000);
				}.bind(this))				
			}
		}.bind(this))
	},
	
};