'use strict';  
  
module.exports = {  
    toDo: {  
        addField: element(by.css('[placeholder="add new todo here"]')),  
        checkedBox: element(by.model('todo.done')),  
        addButton: element(by.css('[value="add"]'))  
    },  
      
    go: function() {  
        browser.get('http://www.angularjs.org');
        browser.waitForAngular();  
    },  
      
    addItem: function(item) {  
        var todo = this.toDo;  
          
        todo.addField.isDisplayed();  
        todo.addField.sendKeys(item);  
        todo.addButton.click();  
    }  
};