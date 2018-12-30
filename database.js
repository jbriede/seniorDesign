const fs = require('fs');
class database {
  constructor(path) 
  {
  	this.tanks = [];
  	this.drinks = [];
  	// this.drinks.push({"name": "beer", "ingredients": [{"tankId": "2", "oz": 5}]})
  	// this.drinks.push({"name": "blah", "ingredients": [{"tankId": "1", "oz": 2}]})

  	// Read drinks from files into object
  	let rawdata = fs.readFileSync('drinks.json');  
  	this.drinks = JSON.parse(rawdata);
  	rawdata = fs.readFileSync('tanks.json');  
  	this.tanks = JSON.parse(rawdata);  
 	
  }
  addDrinks(drink)
  {

  	updateFile()
  }
  removeDrink(drinkId)
  {

  	updateFile()
  }
  getList()
  {
  	return this.drinks;
  }
  updateFile()
  {
  	let data = JSON.stringify(this.drinks);  
  	fs.writeFileSync('drinks.json', data);
  	data = JSON.stringify(this.tanks);
  	fs.writeFileSync('tanks.json', data);
  }

}

module.exports.database = database;  