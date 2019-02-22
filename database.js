const fs = require('fs');


<<<<<<< HEAD
//add_combo
//delete_combo
//get_combos
//get_tanks


//update_files


class Database {
  constructor() 
  {
  	this.tanks = [];
  	this.combos = [];
=======
class database {
  constructor() 
  {
  	this.tanks = [];
  	this.drinks = [];
>>>>>>> 3710c81e51a6ea3606fae57f227c50abcf162028

  	// Read drinks from files into object
  	let rawdata = fs.readFileSync('drinks.json');  
  	this.combos = JSON.parse(rawdata);
  	rawdata = fs.readFileSync('tanks.json');  
    this.tanks = JSON.parse(rawdata); 
    
    this.cur_num_combinations = this.combos.length;
    if (this.combos.length > 0)
    {
      this.cur_num_combinations = this.combos[this.combos.length-1].id + 1;
    } 
 	
  }
<<<<<<< HEAD
  add_combo(combination)
  {
    combination.id = this.cur_num_combinations;
		this.combos.push(combination);
		this.cur_num_combinations += 1;
  	this.updateFile()
=======
  addCombo(combination)
  {
	this.drinks.push(combination);
  	updateFile()
>>>>>>> 3710c81e51a6ea3606fae57f227c50abcf162028
  }
  delete_combo(drinkId)
  {
    // this.combos.pop(drinkId);
    // this.cur_num_combinations -= 1;
    
    var drinkComboObjects2 = [];
    var count = 0;
		for (var index = 0; index < this.combos.length; index++)
		{
			if (this.combos[index].id != drinkId)
			{
				drinkComboObjects2[count] = this.combos[index];
				count+=1;	
			}
		}
		this.combos = drinkComboObjects2;
    this.updateFile();
  }
  get_tanks()
  {
  	return this.tanks;
  }
<<<<<<< HEAD
  get_combos()
=======
  getTanks()
  {
  	return this.tanks;
  }
  getDrinks()
>>>>>>> 3710c81e51a6ea3606fae57f227c50abcf162028
  {
    return this.combos;
  }
  updateFile()
  {
  	let data = JSON.stringify(this.combos);  
  	fs.writeFileSync('drinks.json', data);
  	data = JSON.stringify(this.tanks);
  	fs.writeFileSync('tanks.json', data);
  }

}

module.exports = Database;  