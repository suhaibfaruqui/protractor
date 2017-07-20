describe("This is my first Test", function(){
	it("This is my first TestCase", function(){
		
		//To get The website
		browser.get("https://angularjs.org");
		
		//To type the name
		element(by.model("yourName")).sendKeys("Pankaj");
		
		//To read the name and print it using JS promises
		element(by.binding("yourName")).getText().then(function(text){console.log(text);});
	});
	
});