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

var db = new Database();

const Dispenser = require('./dispenser.js');
var dispense = new Dispenser(db);




// var sensor = require('node-dht-sensor');

//  var gpio = require('rpi-gpio');
//  var gpiop = gpio.promise;

app.use(express.static('public'))

app.get('/', function(req, res){
  res.sendFile('public/HTML/index.html', {root: __dirname })
});


//let on = false;

// var update_file = function(file, data)
// {
// 	let text = Jdb.add_combo();SON.stringify(data);
// 	fs.writeFileSync(file, text);
// }

//Database.update_file()

// var read_file = function(file)
// {
// 	let rawdata = fs.readFileSync(file);  
//   	return JSON.parse(rawdata);  
// }

//var tankArray = read_file('tanks.json');

//var drinkComboObjects = read_file('drinks.json');
//var cur_num_combinations = drinkComboObjects.length;

var desiredTemp = 50;
var curr_temp = 80;
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

	});
	socket.on('getTanks', function()
	{
		socket.emit("tanks", db.get_tanks());
	});
	socket.on('setTemperature', function(degrees)
	{
		desiredTemp = degrees;
	});
	socket.on('getDesiredTemp', function()
	{

		socket.emit("desiredTempReturn", desiredTemp);

	});
	socket.on('getDesiredTemp', function()
	{

		socket.emit("desiredTempReturn", desiredTemp);

	});
	socket.on('getTemp', function()
	{
		// sensor.read(11 , 26, function(err, temperature, humidity) {
		//     if (!err) {
		//         console.log('temp: ' + temperature.toFixed(1) + '°C, ' + 'humidity: ' + humidity.toFixed(1) + '%');
		// 		socket.emit("tempReturn", temperature.toFixed(1) );
		//     }
		// });
		socket.emit("tempReturn", 30);
		
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

