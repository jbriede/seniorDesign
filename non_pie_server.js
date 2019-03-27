/*
This program needs to:
- control the GUI
- Control the flow
- Detect low water level?
- regulate temperature
*/
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const fs = require('fs');
//var Database = require('database.js');
// var sensor = require('node-dht-sensor');

//  var gpio = require('rpi-gpio');
//  var gpiop = gpio.promise;

const Database = require('./database.js');
const TemperatureRegulator = require('./temperatureRegulator.js');

var db = new Database();
var temp = new TemperatureRegulator();


const Dispenser = require('./dispenser.js');
var dispense = new Dispenser(db);




// var sensor = require('node-dht-sensor');

//  var gpio = require('rpi-gpio');
//  var gpiop = gpio.promise;

app.use(express.static('public'))

app.get('/', function(req, res){
  res.sendFile('public/HTML/index.html', {root: __dirname })
});



io.on('connection', function(socket){
	socket.on('getCombinations', function()
	{
		socket.emit("combinations", db.get_combos());
	});
	socket.on('newCombination', function(combinationObject)
	{
		console.log("adding : " + combinationObject);
		db.add_combo(combinationObject);
	});

	socket.on('deleteCombination', function(drinkId)
	{
		console.log("deleting : " + drinkId);

		db.delete_combo(drinkId);

	});
	socket.on('refillContainer', function(refilObject)
	{
	//	db.refill_tank(tank, amount)

	});
	socket.on('getTanks', function()
	{
		socket.emit("tanks", db.get_tanks());
	});
	socket.on('setTemperature', function(new_temp)
	{
		temp.set_temp(new_temp);
	});
	socket.on('getDesiredTemp', function()
	{
		socket.emit("desiredTempReturn", temp.get_desired_temp());

	});

	socket.on('getTemp', function()
	{
		socket.emit("tempReturn", temp.get_current_temp());
		
	});
	socket.on('dispenseSingleDrink', function(tankId){
		console.log("dispense " + tankId);
		var tanks = db.get_tanks();
		var pin = tanks[tankId].pin;
		turnon(pin);
	});
	socket.on('stopDispense', function(){
		console.log("Stop dispensing");
		var tankArray = db.get_tanks;
		for (var i = 0; i < tankArray.length; i++)
		{
			var pin = tankArray[i].pin;
			turnoff2(pin);
			console.log("turnoff pin ", pin);
		}
		

	});

	// dispenseObj 
	// {
	// 	drinkid: 2,
	// 	mL: 200
	// }


	socket.on('dispenseCombination', function(dispenseObj){ 
		var drink_id = dispenseObj.id; 	// drinkId 
		dispense.dispense_combo(drink_id, dispenseObj.ml);

	});
});

http.listen(3000, function(){
  console.log('listening on *:3000 hello');

});





function turnoff()
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
function turnoff2(pin)
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

function turnon(pin)
{
	// gpiop.setup(pin, gpio.DIR_OUT).then(() =>
	// {
	// 	return gpio.write(pin, true)
	// }).catch((err) => {
	// 	console.log(err)
	// })
}
    



// var GUI = require('./GUIBackend');
//var DB = require('./database');

// var databse = new DB.database("");

