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

app.use(express.static('public'))

app.get('/', function(req, res){
  res.sendFile('public/index.html', {root: __dirname })
});

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

var cur_num_combinations = 0;
var desiredTemp = 50;
var curr_temp = 80;

io.on('connection', function(socket){
	socket.on('getCombinations', function()
	{
		socket.emit("combinations", drinkComboObjects);
	});
	socket.on('getTanks', function()
	{
		socket.emit("tanks", tankArray);
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
	socket.on('setTemperature', function(degrees)
	{
		desiredTemp = degrees;
	});
	socket.on('getTemp', function()
	{
		socket.emit("tempReturn", curr_temp);
		curr_temp -=1;

	});
	socket.on('getDesiredTemp', function()
	{

		socket.emit("desiredTempReturn", desiredTemp);

	});
	socket.on('dispenseSingleDrink', function(tankId){
		console.log("dispense " + tankId);
	});
	socket.on('stopDispense', function(){
		console.log("Stop dispensing");
	});
	socket.on('dispenseCombination', function(drinkId){
		
		console.log("Dispensing: ", drinkId);
	});

});

http.listen(3000, function(){
  console.log('listening on *:3000 hello');

});



