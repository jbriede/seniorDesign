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
//var Database = require('database.js');

 // var gpio = require('rpi-gpio');
 // var gpiop = gpio.promise;

app.use(express.static('public'))

app.get('/', function(req, res){
  res.sendFile('public/index.html', {root: __dirname })
});


let on = false;

drinkComboObjects = [];
var cur_num_combinations = 0;
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

	});
	socket.on('refillContainer', function(refilObject)
	{

	});
	socket.on('setTemperature', function(degrees)
	{
		desiredTemp = degrees;
	});
	socket.on('getTemp', function()
	{
		// var sensor = require('node-dht-sensor');

		// sensor.read(22, 4, function(err, temperature, humidity) {
		//     if (!err) {
		//         console.log('temp: ' + temperature.toFixed(1) + '°C, ' +
		//             'humidity: ' + humidity.toFixed(1) + '%'
		//         );
		//     }
		// });
		socket.emit("tempReturn", curr_temp);
		curr_temp -=1;

	});
	socket.on('getDesiredTemp', function()
	{

		socket.emit("desiredTempReturn", desiredTemp);

	});
	socket.on('dispenseSingleDrink', function(tankId){

	});
	socket.on('dispenseCombination', function(drinkId){
		




		// gpiop.setup(18, gpio.DIR_OUT).then(() =>
		// {
		// 	return gpio.write(18, false)
			
		// 	}).catch((err) => {
		// 		console.log(err)
		// }) 



		// setTimeout(endBlink, 5000);




		
		console.log("Dispensing: ", drinkId);
	});

});

http.listen(3000, function(){
  console.log('listening on *:3000 hello');

});





// console.log('here')


// function turnoff()
// {
// 	gpiop.setup(18, gpio.DIR_OUT).then(() =>
// 	{
// 		return gpio.write(18, false)
// 	}).catch((err) => {
// 		console.log(err)
// 	})
// }

// setTimeout(turnoff, 3000);

// var GUI = require('./GUIBackend');
//var DB = require('./database');

// var databse = new DB.database("");
