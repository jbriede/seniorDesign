

class Dispenser {
    constructor(db) 
    {
       this.db = db;
       this.seconds_per_ml = 1
       
    }
   
    dispense_combo(drink_id, ml)
    {
        
        var tankArray = this.db.get_tanks();
        var total_parts = 0;
        var drink = this.db.find_drink(drink_id);
        for (var i = 0; i < drink.ingredients.length; i++)
        {
            total_parts = drink.ingredients[i].parts + total_parts;
        }

        for (var i = 0; i < drink.ingredients.length; i++)
        {
            // var pin = drink.ingredients[i].pin;
            var tank_id = drink.ingredients[i].tankId;
            var pin = tankArray[tank_id].pin;


            var ratio = drink.ingredients[i].parts/total_parts;
            var ml_ratio = ratio*ml;
            var seconds = ml_ratio * this.seconds_per_ml;
            console.log("   drink ", tankArray[tank_id].name, " seconds ", seconds);

            this.turnon(pin);

            setTimeout(this.turnoff.bind({pin: pin}), seconds*1000); //modified to use bind. Bind ties each call to current paramaters

        }

    }


    turnoff()
    {
        // gpiop.setup(this.pin, gpio.DIR_OUT).then(() =>
        // {
        // 	console.log("off", this.pin);
        // 	return gpio.write(this.pin, false)
        // }).catch((err) => {
        // 	console.log("CANT USE PIN", this.pin)
        // 	console.log(err)
        // })
    }

    turnon(pin)
    {
    	// gpiop.setup(pin, gpio.DIR_OUT).then(() =>
    	// {
    	// 	return gpio.write(pin, true)
    	// }).catch((err) => {
    	// 	console.log(err)
    	// })
    }
    


  }
  
  module.exports = Dispenser;  