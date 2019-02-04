const fs = require('fs');


class database {
  constructor() 
  {
  	this.tanks = [];
  	this.drinks = [];

  	// Read drinks from files into object
  	let rawdata = fs.readFileSync('drinks.json');  
  	this.drinks = JSON.parse(rawdata);
  	rawdata = fs.readFileSync('tanks.json');  
  	this.tanks = JSON.parse(rawdata);  
 	
  }
  addCombo(combination)
  {
	this.drinks.push(combination);
  	updateFile()
  }
  removeDrink(drinkId)
  {

  	updateFile()
  }
  getTanks()
  {
  	return this.tanks;
  }
  getDrinks()
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