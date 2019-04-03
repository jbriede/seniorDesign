//  var gpio = require('rpi-gpio');
//  var gpiop = gpio.promise;

class Dispenser {
    constructor(db) 
    {
       this.db = db;
       this.ml_per_second = 20;
       
    }

    dispense_single_drink(tankId)
    {
        console.log("dispense " + tankId);
        this.dispense_start = Date.now(); //grab time when dispense starts
        console.log("dispense start: ", this.dispense_start);
		var tanks = this.db.get_tanks();
		var pin = tanks[tankId].pin;
		this.turnon(pin);
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
            this.db.update_tank_level(tank_id, ml);
            var seconds = ml_ratio / this.ml_per_second;
            console.log("   drink ", tankArray[tank_id].name, " seconds ", seconds);

            this.turnon(pin);

            setTimeout(this.turnoff.bind({pin: pin}), seconds*1000); //modified to use bind. Bind ties each call to current paramaters

        }

    }

    stop_dispense(tankId)
    {
        console.log("Stop dispensing");
		var tankArray = this.db.get_tanks();

        var pin = tankArray[tankId].pin;
        this.turnoff2(pin);
        var time_dispense = Date.now() - this.dispense_start;
        var ml_dispensed = time_dispense*this.ml_per_second/1000;
        console.log("dispense end: ",Date.now(), " \namount dispensed: ", ml_dispensed);
        this.db.update_tank_level(tankId, ml_dispensed)
        //console.log("turnoff pin ", pin);
    
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


    turnoff2(pin)
{
	// gpiop.setup(pin, gpio.DIR_OUT).then(() =>
	// {
	// 	console.log("off", pin);
	// 	return gpio.write(pin, false)
	// }).catch((err) => {
	// 	console.log("CANT USE PIN", pin)
	// 	console.log(err)
	// })
}
    

    


  }
  
  module.exports = Dispenser;  