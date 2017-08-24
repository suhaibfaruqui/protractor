	/*
	 * TODO scenarios on nav page
	 * 1. clicking books and 'view all cat' navigates to same page
	 * 2. check links for all categories and ebooks etc
	 * 3. presence of all categories(will be covered in 2 above)
	 * 4. later 
	 * - check 'view all cat'/books displays all categories
	 */
var homePage = require('../pages/homePage.js'); 
var booksPage = require('../pages/booksPage.js');
var testData =  require('../test_data/booksPageTestData.js')
var utilities = require('../utilities.js')
var using = require('jasmine-data-provider');

xdescribe("Tests for Books dropdown on home page", function() {
	beforeAll(function() {
		//browser.get(homePage.baseURL);
	})
	it("Verify books dropdown is appearing on hover", function() {
		browser.actions().mouseMove(booksPage.elements.booksDropdownButton).perform().then(function() {
			browser.sleep(1000);
			expect(booksPage.elements.booksDropdown.isPresent()).toBeTruthy();
		})
	},100000)

	it("Verify book categories are displayed on books dropdown", function() {
		browser.actions().mouseMove(booksPage.elements.booksDropdownButton).perform();
		browser.sleep(1000);
		for (i=0; i<testData.booksCategories.length; i++) {
			//console.log(testData.booksCategories[i].name)
			expect(booksPage.booksDropdownElement(testData.booksCategories[i].name).isPresent()).toBeTruthy();
		}		
	},100000)
	
	it("Verify book categories link redirects to the correct page", function() {
		for (i=0; i<testData.booksCategories.length; i++) {
			browser.actions().mouseMove(booksPage.elements.booksDropdownButton).perform();
			browser.sleep(1000);
			//booksPage.booksDropdownElement(testData.booksCategories[i].name).click().then(function() {
			browser.actions().mouseMove(booksPage.booksDropdownElement(testData.booksCategories[i].name)).keyDown(protractor.Key.CONTROL).click().keyUp(protractor.Key.CONTROL).perform().then(function(done) {
				utilities.switchWindowAndVerifyURL(browser.params.baseURL + testData.booksCategories[i].url);
			}(i))
		}
	}, 900000)

})


xdescribe("Book Sorting test cases", function() {
	//TODO verify for second dropdown as well
	beforeAll(function() {
		browser.get(utilities.baseURL + 'childrens-books').then(function() {
			utilities.removeLocationPrompt();
		})
	})
	
	it("Verify contents of 'Sort By' dropdown", function() {
		booksPage.verifySortingContents();
	},900000)
	
	it("Verify default sorting is 'Newest First'", function() {
		expect(booksPage.elements.sortByDropdown.getText()).toEqual('Newest First');
		expect(booksPage.elements.selectedValue.getText()).toEqual('Newest First');
		booksPage.elements.sortByDropdown.click();
	},900000)
	
	using(testData.sortingTypes, function(data) {
		it("Verify changing to sorting : " + data, function() {
			booksPage.verifySorting(data);
		},900000)
	})
})


xdescribe("View test cases", function() {
	//TODO verify for lower view buttons also 
	beforeAll(function() {
		browser.get(utilities.baseURL + 'childrens-books').then(function() {
			utilities.removeLocationPrompt();
		})
	})
	
	it("Verify default grid view is List View", function() {
		booksPage.verifyView("List")
	},100000)
	
	it("Verify changing view to Grid View", function() {
		booksPage.verifyChangeView("Grid")
	},100000)
	
	it("Verify changing view to List View", function() {
		booksPage.verifyChangeView("List")
	},100000)
})


xdescribe("Pagination test cases", function() {
	beforeAll(function() {
		browser.get(utilities.baseURL + 'childrens-books').then(function() {
			utilities.removeLocationPrompt();
		})
	})

	//TODO same scenarios for grid view as well	
	it("Verify 12 items are displayed on each page in default view(list)", function() {
		booksPage.verifyBooksOnEachPage()
	},100000)
	
	//TODO same scenarios for lower navigation buttons, arrows
	it("Verify functionality of 'Previous' button", function() {
		booksPage.verifyBackNavigation('button')
	},100000)
	
	it("Verify functionality of 'Next' button", function() {
		booksPage.verifyForwardNavigation('button')
	},100000)
	
	it("Verify functionality of 'Previous' arrow", function() {
		booksPage.verifyBackNavigation('arrow')
	},100000)
	
	it("Verify functionality of 'Next' arrow", function() {
		booksPage.verifyForwardNavigation('arrow')
	},100000)
})


describe("'Browse By' test cases", function() {
	beforeAll(function() {
		browser.get(utilities.baseURL + 'childrens-books').then(function() {
			utilities.removeLocationPrompt();
		})
	})

	xit("Verify applying 'New Releases' filter", function() {
		booksPage.applyNewReleaseFilter()
	},100000)
	
	it("Verify applying 'Coming Soon' filter", function() {
		booksPage.applyComingSoonFilter()
	},100000)
})