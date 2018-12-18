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

io.on('connection', function(socket){
	socket.on('getDrinks', function()
	{

	});
	socket.on('newDrink', function(drinkObject)
	{
		console.log(drinkObject);
	});
	socket.on('removeDrink', function(drinkId)
	{

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

