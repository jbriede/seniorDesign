/*
This program needs to:
- control the GUI
- Control the flow
- Detect low water level?
- regulate temperature
*/

//var child;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const fs = require('fs');

const Database = require('./database.js');
var db = new Database();

const TemperatureRegulator = require('./temperatureRegulator.js');
var temp = new TemperatureRegulator();

const Dispenser = require('./dispenser.js');
var dispense = new Dispenser(db);


app.use(express.static('public'))

app.get('/', function(req, res){
  res.sendFile('public/HTML/index.html', {root: __dirname })
});


io.on('connection', function(socket){
	db.add_socket(socket);
	socket.on('getCombinations', function()
	{
		socket.emit("combinations", db.get_combos());
	});
	socket.on('newCombination', function(combinationObject)
	{
		console.log("adding : " + combinationObject);
		//child.kill();
		//console.log('\nKilling Florence');
		db.kill_keyboard();
		db.add_combo(combinationObject);
	});

	socket.on('deleteCombination', function(drinkId)
	{
		console.log("deleting : " + drinkId);

		db.delete_combo(drinkId);

	});
	socket.on('refillContainer', function(refilObject)
	{
		db.refill_tank(refilObject);
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
		dispense.dispense_single_drink(tankId);
	});
	socket.on('stopDispense', function(tankId){
		dispense.stop_dispense(tankId);
	});

	socket.on('dispenseCombination', function(dispenseObj){ 
		var drink_id = dispenseObj.id; 	// drinkId 
		dispense.dispense_combo(drink_id, dispenseObj.ml);
		//this.child.kill();

	});
	socket.on('text_enter', function()
	{
		db.start_keyboard();
		// child = exec('florence');
		// console.log('\nStarting florence');
		//child.kill();
		//console.log('\nExiting Florence');
	});

});

http.listen(3000, function(){
  console.log('listening on *:3000 hello');

});


