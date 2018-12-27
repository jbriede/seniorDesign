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

	});
	socket.on('getTemperature', function()
	{

	});
	socket.on('dispenseLiquid', function(tankId){

	});



  socket.on('chat message', function(msg){
  	console.log("herre");

  // 	if (!on)
  // 	{
  // 		gpiop.setup(18, gpio.DIR_OUT).then(() =>
		// {
		// 	return gpio.write(18, true)
		// 	}).catch((err) => {
		// 		console.log(err)
		// }) 
  // 	}
  // 	else
  // 	{
  // 		turnoff();
  // 	}
 	// on = !on;

	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');

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

