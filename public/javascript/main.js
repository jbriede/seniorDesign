/*
 * Main GUI javascript to organize other javascript files
 */

var socket = io();


var item0 = {"id": 0, "name": "Lemonade", "available": true};
var item1 = {"id": 1, "name": "Iced Tea", "available": true};
var item2 = {"id": 2, "name": "Coke", "available": true};
var item3 = {"id": 3, "name": "Sprite", "available": true};
var item4 = {"id": 4, "name": "Rum", "available": true};
var tankArray = [item0, item1, item2, item3, item4];




loadCombinationsProcedure(socket);

var addDrinkButton = document.getElementById("addDrinkButton");
addDrinkButton.onclick = function()
{
	addDrinkProcedure(tankArray, socket).then(function(result) 
	{

		/* Once the new drink has been sent to the server, the promise will resolve */
		loadCombinationsProcedure(socket);
	}, function(err) 
	{
	  console.log(err); // Error: "It broke"
	});
}

var deleteDrinkButton = document.getElementById("deleteDrinkButton");
deleteDrinkButton.onclick = function()
{
	deleteDrinkProcedure(socket).then(function(result) 
	{

		/* Once the new drink has been sent to the server, the promise will resolve */
		loadCombinationsProcedure(socket);
	}, function(err) 
	{
	  console.log(err); // Error: "It broke"
	});
}
// fillContainer.onclick = function()
// {

// 	loadCombinationsProcedure(socket, tankArray); // From CombinationLoader.js
// }

// cleanContainer.onclick = function()
// {

// 	loadCombinationsProcedure(socket, tankArray); // From CombinationLoader.js
// }

// setTemperature.onclick = function()
// {

// }