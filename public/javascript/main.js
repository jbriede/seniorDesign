/*
 * Main GUI javascript to organize other javascript files
 */

var socket = io();

var popupContainer = document.getElementById("popupContainer");

var start = function()
{
    /* I hate jquery but I need it for this i guess. */
    $("#menuContainer").load('HTML/menu.html', function()
    {
        setupAddListeners();
        setupRemoveListeners();
        setupTempListeners();
        setupFillListeners();
        setupCleanListeners();
    });
    loadCombinations();
    loadSingles();
}


start();

// var deleteDrinkButton = document.getElementById("deleteDrinkButton");
// deleteDrinkButton.onclick = function()
// {
// 	deleteDrinkProcedure(socket).then(function(result) 
// 	{

// 		/* Once the new drink has been sent to the server, the promise will resolve */
// 		loadCombinationsProcedure(socket);
// 	}, function(err) 
// 	{
// 	  console.log(err); // Error: "It broke"
// 	});
// }

// var setTemperatureButton = document.getElementById("setTemperature");
// setTemperatureButton.onclick = function()
// {
// 	tempSetProcedure(socket);
// }
// var currTempButton = document.getElementById("currTempButton");

// var tempCallback = function()
// {
// 	setTimeout(function()
// 	{ 
// 		getTemp(socket).then(function(temp) 
// 		{

// 			/* Once the new drink has been sent to the server, the promise will resolve */
// 			currTempButton.innerHTML = "(" + temp + " F)";
// 			tempCallback();
// 		}, function(err) 
// 		{
// 		  console.log(err); // Error: "It broke"
// 		});

// 	}, 3000);
// }
// tempCallback();

// var fillTankButton = document.getElementById("fillTankButton");
// fillTankButton.onclick = function()
// {

// 	FillTankProcedure(socket); 
// }
