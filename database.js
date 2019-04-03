const fs = require('fs');


class Database {
  constructor() 
  {
  	this.tanks = [];
  	this.combos = [];

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
  add_combo(combination)
  {
    combination.id = this.cur_num_combinations;
		this.combos.push(combination);
		this.cur_num_combinations += 1;
  	this.updateFile()
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

  deleteCombosWithId(changedTankId)
  {
    var combosToDelete = [];
    for (var comboIndex = 0; comboIndex < this.combos.length; comboIndex++)
    {
      var combo = this.combos[comboIndex];
      for (var ingredientIndex = 0; ingredientIndex < combo.ingredients.length; ingredientIndex++)
      {
        var ingredient = combo.ingredients[ingredientIndex];
        if (ingredient.tankId == changedTankId)
        {
          // Delete this combo we don't have this ingredeint any more
          combosToDelete.push(combo.id);
          break;
          
        }
      }
    }

    var context = this;

    combosToDelete.forEach(function(comboId)
    {
      context.delete_combo(comboId);
    });

  }

  get_tanks()
  {
  	return this.tanks;
  }
  get_combos()
  {
    return this.combos;
  }

  refill_tank(refillObject)
  {
    var tank_id = refillObject.id;
    this.tanks[tank_id].ml = refillObject.aprox_mL;
    this.tanks[tank_id].name = refillObject.name;
    this.tanks[tank_id].available = true; 
    if (refillObject.new)
    {
      this.deleteCombosWithId(tank_id);
    }
    this.updateFile();
  }

  update_tank_level(i, ml_dispensed)
  {
    this.tanks[i].ml = this.tanks[i].ml - ml_dispensed;
    if (this.tanks[i].ml < 0)
    {
      this.tanks[i].available = false;
    }

    this.updateFile();
  }

  updateFile()
  {
  	let data = JSON.stringify(this.combos);  
  	fs.writeFileSync('drinks.json', data);
  	data = JSON.stringify(this.tanks);
  	fs.writeFileSync('tanks.json', data);
  }

  find_drink(drink_id)
  {
    for (var i = 0; i < this.combos.length; i++)
    {
      if (this.combos[i].id == drink_id)
      {
        return(this.combos[i]);
      }
    }
  }
}

module.exports = Database;  