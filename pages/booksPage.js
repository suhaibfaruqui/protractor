'use strict';
var utilities = require('../utilities.js')
var testData =  require('../test_data/booksPageTestData.js')

module.exports = {
		elements: {
			booksDropdownButton	: element(by.xpath('//div[contains(@class,"navbar")]//a[@title="Books" and @data-hover="dropdown" and @href="/uk/books/"]')),
			booksDropdown		: element(by.xpath("//div[contains(@class,'navbar')]//a[@title='Books' and @data-hover='dropdown' and @href='/uk/books/']/../div/h3[text()='Shop by Category']")),
			sortByDropdown		: element(by.xpath("//button[@data-id='sortby']/div[1]")),
			selectedValue		: element(by.xpath("//select[@id='sortby']/following-sibling::div//li[@class='selected']//span")),
			sortingValuesArray	: element.all(by.xpath("//button[@data-id='sortby']/following-sibling::div//span")),
			listViewActive		: element.all(by.xpath("//span[@class='views list-view active']")),
			gridViewActive		: element.all(by.xpath("//span[@class='views grid-view active']")),
			listView			: element(by.xpath("//div[@class='pl-sec']")),
			gridView			: element(by.xpath("//div[@class='pro-grid mt-20']")),
			gridViewButton		: element.all(by.xpath("//span[@class='views grid-view ']/a")),
			listViewButton		: element.all(by.xpath("//span[@class='views list-view']/a")),
			booksListArray		: element.all(by.xpath("//li[@class='row-fluid']")),
			currentPageElement	: element(by.xpath("(//div[@class='pagination visible-desktop']//a[@class='active'])[1]")),
			nextArrow			: element(by.xpath("(//div[@class='pagination visible-desktop']//a[@class='pagi-arrow right'])[1]")),
			nextButton			: element(by.xpath("(//div[@class='pagination visible-desktop']//a[text()='Next'])[1]")),
			nextButtonDisabled	: element(by.xpath("(//div[@class='pagination visible-desktop']//a[text()='Next' and @class='disabled'])[1]")),
			previousArrow		: element(by.xpath("(//div[@class='pagination visible-desktop']//a[@class='pagi-arrow left'])[1]")),
			previousButton		: element(by.xpath("(//div[@class='pagination visible-desktop']//a[text()='Previous'])[1]")),
			newReleaseLabel		: element(by.xpath("//label[@for='newrelease']")),
			comingSoonLabel		: element(by.xpath("//label[@for='comingsoon']")),
			newReleaseCount		: element(by.xpath("//label[@for='newrelease']/span")),
			comingSoonCount		: element(by.xpath("//label[@for='comingsoon']/span")),
			preOrderButton		: element(by.css('.js-buybutton-finder-main.button.button--cta-blue.js-buy-retailer')),
			lastPageNumber		: element(by.xpath("((//div[@class='pagination visible-desktop'])[1]//li/a)[last()-2]")),
			
			
			xpaths	: {
				bookMoreDetails	: "(//li[@class='row-fluid']//a[text()='More Details'])",
				sortValue		: "//select[@id='sortby']/following-sibling::div//span",
				prices			: "//li[@class='row-fluid']/div[3]/div[1]",
				bookTitle		: "//li[@class='row-fluid']/div[2]/h2/a",
				pageNumber		: "//div[@class='pagination visible-desktop']//a[text()=",
			}
		},
		
		booksDropdownElement: function(name) {
			return element(by.xpath("//div[contains(@class,'navbar')]//a[@title='Books' and @data-hover='dropdown' and @href='/uk/books/']/..//a[contains(@title,'" + name + "')]"));
		},
		
		verifySortingContents: function() {
			this.elements.sortByDropdown.click().then(function() {
				for(var i=0; i<testData.sortingTypes.length; i++) {
					expect(this.elements.sortingValuesArray.get(i).getText()).toEqual(testData.sortingTypes[i]);
				}
			}.bind(this))
		},
		
		verifySorting: function(sortingName) {
			browser.sleep(2000);
			utilities.removeJoinNewsletterPrompt();
			browser.sleep(2000);
			this.elements.sortByDropdown.click().then(function() {
				element(by.xpath(this.elements.xpaths.sortValue + "[text()='" + sortingName + "']")).click().then(function() {
					if (sortingName == "Newest First") {
						this.verifySortingNewestFirst();
					} else if (sortingName == "Most relevant first") {
						//TODO
					} else if (sortingName == "Price(High to Low)") {
						this.verifySortingHighLow();
					} else if (sortingName == "Price(Low to High)") {
						this.verifySortingLowHigh();
					} else if (sortingName == "Alphabetically(A-Z)") {
						this.verifySortingAlphaAsc();
					} else {
						this.verifySortingAlphaDesc();
					}
				}.bind(this))
			}.bind(this))			
		},
		
		verifySortingNewestFirst: function() {
			var presentBookDate;
			var previousBookDate = new Date("01 Jan 2099");
			for(var i = 0; i < 6; i++) {
				element.all(by.xpath(this.elements.xpaths.bookMoreDetails)).get(i).click().then(function() { 
				//element(by.xpath(this.elements.xpaths.bookMoreDetails + "[" + i + "]")).click().then(function() {
					element(by.xpath("//p[@class='js-book-author']/following-sibling::p")).getText().then(function(text) {
						  presentBookDate = new Date(text.toString().slice(11));
						  expect(presentBookDate <= previousBookDate).toBeTruthy(); 
						  previousBookDate = presentBookDate;
						  browser.navigate().back();
					});
				})
			}
		},
		
		verifySortingHighLow: function() {
			console.log("verifySortingHighLow")
			var presentPrice = 0;
			var previousPrice = 99999;
			for (var i = 0; i < 12; i++) {
				element.all(by.xpath(this.elements.xpaths.prices)).get(i).getText().then(function(text) {
					presentPrice = parseFloat(text.slice(1));
					expect(presentPrice <= previousPrice).toBeTruthy();
					previousPrice = presentPrice;
				})
			}			
		},
		
		verifySortingLowHigh: function() {
			console.log("verifySortingLowHigh")
			var presentPrice = 0;
			var previousPrice = 0;
			for (var i = 0; i < 12; i++) {
				element.all(by.xpath(this.elements.xpaths.prices)).get(i).getText().then(function(text) {
					presentPrice = parseFloat(text.slice(1));
					expect(presentPrice >= previousPrice).toBeTruthy();
					previousPrice = presentPrice;
				})
			}	
		},
		
		verifySortingAlphaAsc: function() {
			console.log("verifySortingAlphaAsc")
			var presentWord;
			var previousWord = "00000";
			for (var i = 0; i < 12; i++) {
				element.all(by.xpath(this.elements.xpaths.bookTitle)).get(i).getText().then(function(text) {
					presentWord = text;
					expect(presentWord >= previousWord).toBe(true,presentWord + " should come before " + previousWord);
					previousWord = presentWord;
				})
			} 
		},
		
		verifySortingAlphaDesc: function() {
			console.log("verifySortingAlphaDesc")
			var presentWord;
			var previousWord = "ZZZZZZ";
			for (var i = 0; i < 12; i++) {
				element.all(by.xpath(this.elements.xpaths.bookTitle)).get(i).getText().then(function(text) {
					presentWord = text;
					expect(presentWord <= previousWord).toBe(true,presentWord + " should come before " + previousWord);
					previousWord = presentWord;
				})
			} 
		},
		
		verifyView: function(view) {
			if(view == "List") {
				expect(this.elements.listView.isDisplayed()).toBeTruthy()
				this.elements.listViewActive.count().then(function(count) {
					expect(count).toBe(2,"List View not enabled")
				})
			} else {
				expect(this.elements.gridView.isDisplayed()).toBeTruthy()
				this.elements.gridViewActive.count().then(function(count) {
					expect(count).toBe(2,"Grid View not enabled")
				})
			}			
		},
		
		verifyChangeView: function(view) {
			if(view == "List") {
				this.elements.listViewButton.get(0).click().then(function() {
					this.verifyView(view)
				}.bind(this))
			} else {
				this.elements.gridViewButton.get(0).click().then(function() {
					this.verifyView(view)
				}.bind(this))
			}			
		},
		
		verifyBooksOnEachPage: function() {
			for(var i = 2; i < 7; i++) {
				element.all(by.xpath(this.elements.xpaths.pageNumber + "'" + i + "']")).get(0).click().then(function() {
					this.elements.booksListArray.count().then(function(count) {
						expect(count).toBe(12, "Books count is less than 12")
					})
				}.bind(this))				
			}
		},
		
		verifyPageNavigation: function(navigation,type) {
			var currentPage = this.elements.currentPageElement
			currentPage.getText().then(function(text) {
				var pageNumber = parseInt(text)
				if(navigation == 'Previous') {
					
					
				} else {

				}			
			})
		},
		
		verifyBackNavigation: function(type) {
			this.elements.currentPageElement.getText().then(function(text) {
				if (type == 'button') {
					this.elements.previousButton.click().then(function() {
						this.checkPageNumber('Previous',parseInt(text));
					}.bind(this))
				} else {
					this.elements.previousArrow.click().then(function() {
						this.checkPageNumber('Previous',parseInt(text));
					}.bind(this))
				}
			}.bind(this))
		},
		
		verifyForwardNavigation: function(type) {
			this.elements.currentPageElement.getText().then(function(text) {
				if (type == 'button') {
					this.elements.nextButton.click().then(function() {
						this.checkPageNumber('Next',parseInt(text));
					}.bind(this))
				} else {
					this.elements.nextArrow.click().then(function() {
						this.checkPageNumber('Next',parseInt(text));
					}.bind(this))
				}
			}.bind(this))
		},
		
		checkPageNumber: function(type,lastPageNumber) {
			this.elements.currentPageElement.getText().then(function(text) {
				if (type == 'Previous') {
					expect(parseInt(text)).toBe(lastPageNumber-1);
				} else {
					expect(parseInt(text)).toBe(lastPageNumber+1);
				}
			})
		},
		
		applyNewReleaseFilter: function() {
			this.elements.newReleaseLabel.click().then(function() {
				
			})
		},
		
		applyComingSoonFilter: function() {
			this.getCountFromLabel(this.elements.comingSoonCount).then(function(count) {
				this.elements.comingSoonLabel.click().then(function() {
					element.all(by.xpath(this.elements.xpaths.bookMoreDetails)).get(0).click().then(function() {
						expect(this.elements.preOrderButton.isPresent()).toBe(true,"first book preorder not found")
						browser.navigate().back().then(function() {
							this.navigateToLastPage().then(function(text) {
								console.log(text)
								console.log("kamyaab")
								element.all(by.xpath(this.elements.xpaths.bookMoreDetails)).last().click().then(function() {
									expect(this.elements.preOrderButton.isPresent()).toBe(true,"last book preorder not found")
								}.bind(this))
							}.bind(this))
						}.bind(this))
					}.bind(this))				
				}.bind(this))
			}.bind(this))
		},
		
		navigateToLastPage: function() {
			return new Promise(function(resolve,reject) {
				console.log("inside promise")
				var nextButtonDisabled = this.elements.nextButtonDisabled
				var nextButton = this.elements.nextButton
				find()
				
				function find() {
					nextButtonDisabled.isPresent().then(function(presence) {
						if (presence) {
							resolve("this is resolved")
						} else {
							nextButton.click().then(function() {
								find()
							})
						}
					})
				}
				
			}.bind(this))
		},
		
		getCountFromLabel: function(countElement) {
			return new Promise(function(resolve,reject) {
				countElement.getText().then(function(text) {
					var count = parseInt(text.slice(2,3))
					if (count>0) {
						resolve(count)
					} else {
						reject(count)
					}
				})
			})
		},
		
		findBookCount: function() {
			return new Promise(function(resolve,reject) {
				this.elements.lastPageNumber.getText().then(function(text) {
					
				})
			})
		}
		
}