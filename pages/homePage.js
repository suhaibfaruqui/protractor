'use strict';

module.exports = {
		baseURL: "https://www.dk.com/uk/",
		
		elements: {
			locationPrompt: element(by.xpath('//*[text() = "Ignore and continue"]')),
		},

		verifyTitle: function(websiteTitle) {
			browser.getTitle().then(function (title) {
            	expect(title).toEqual(websiteTitle);
            })
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
}
