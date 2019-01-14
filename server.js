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
var sensor = require('node-dht-sensor');

 var gpio = require('rpi-gpio');
 var gpiop = gpio.promise;

app.use(express.static('public'))

app.get('/', function(req, res){
  res.sendFile('public/index.html', {root: __dirname })
});


//let on = false;

var update_file = function(file, data)
{
	let text = JSON.stringify(data);
	fs.writeFileSync(file, text);
}

var read_file = function(file)
{
	let rawdata = fs.readFileSync(file);  
  	return JSON.parse(rawdata);  
}

var tankArray = read_file('tanks.json');


var drinkComboObjects = read_file('drinks.json');


var cur_num_combinations = drinkComboObjects.length;
var desiredTemp = 50;
var curr_temp = 80;
io.on('connection', function(socket){
	socket.on('getCombinations', function()
	{
		socket.emit("combinations", drinkComboObjects);
	});
	socket.on('newCombination', function(combinationObject)
	{
		console.log("adding : " + combinationObject);
		combinationObject.id = cur_num_combinations;
		drinkComboObjects.push(combinationObject);
		cur_num_combinations += 1;
		update_file('drinks.json', drinkComboObjects);
	});
	socket.on('deleteCombination', function(drinkId)
	{
		console.log("deleting : " + drinkId);
		var drinkComboObjects2 = [];
		var count = 0;
		for (var index = 0; index < drinkComboObjects.length; index++)
		{
			if (drinkComboObjects[index].id != drinkId)
			{
				drinkComboObjects2[count] = drinkComboObjects[index];
				count+=1;	
			}
		}
		drinkComboObjects = drinkComboObjects2;
		update_file('drinks.json', drinkComboObjects);

	});
	socket.on('refillContainer', function(refilObject)
	{

	});
	socket.on('getTanks', function()
	{
		socket.emit("tanks", tankArray);
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
		sensor.read(11 , 26, function(err, temperature, humidity) {
		    if (!err) {
		        console.log('temp: ' + temperature.toFixed(1) + '°C, ' + 'humidity: ' + humidity.toFixed(1) + '%');
				socket.emit("tempReturn", temperature.toFixed(1) );
		    }
		});

		
	});
	socket.on('dispenseSingleDrink', function(tankId){
		console.log("dispense " + tankId);
		var pin = tankArray[tankId].pin;
		turnon(pin);
	});
	socket.on('stopDispense', function(){
		console.log("Stop dispensing");

		for (var i = 0; i < tankArray.length; i++)
		{
			var pin = tankArray[i].pin;
			turnoff2(pin);
			console.log("turnoff pin ", pin);
		}
		

	});
	socket.on('dispenseCombination', function(drinkId){
		                 
                
		console.log("Dispensing: ", drinkId);
		//console.log(drinkComboObjects);

		for (var index = 0; index < drinkComboObjects.length; index++)
		{
			if (drinkComboObjects[index].id == drinkId)
			{
				var drink = drinkComboObjects[index];


				for (var i = 0; i < drink.ingredients.length; i++)
				{
					var ingredient = drink.ingredients[i];
					var tankId = ingredient.tankId;
					var amount = ingredient.oz;
					var pin = tankArray[tankId].pin;
					console.log(pin);

					turnon(pin);

					setTimeout(turnoff.bind({pin: pin}), amount*1000); //modified to use bind. Bind ties each call to current paramaters
					
				}
				break;
			}
		}
		console.log("Dispensing: ", drinkId);
	});
});

http.listen(3000, function(){
  console.log('listening on *:3000 hello');

});





function turnoff()
{
	gpiop.setup(this.pin, gpio.DIR_OUT).then(() =>
	{
		console.log("off", this.pin);
		return gpio.write(this.pin, false)
	}).catch((err) => {
		console.log("CANT USE PIN", this.pin)
		console.log(err)
	})
}
function turnoff2(pin)
{
	gpiop.setup(pin, gpio.DIR_OUT).then(() =>
	{
		console.log("off", pin);
		return gpio.write(pin, false)
	}).catch((err) => {
		console.log("CANT USE PIN", pin)
		console.log(err)
	})
}

function turnon(pin)
{
	gpiop.setup(pin, gpio.DIR_OUT).then(() =>
	{
		return gpio.write(pin, true)
	}).catch((err) => {
		console.log(err)
	})
}
    



// var GUI = require('./GUIBackend');
//var DB = require('./database');

// var databse = new DB.database("");

