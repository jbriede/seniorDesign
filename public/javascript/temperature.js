/*
 * Show show temp controls
 */

var getTemp = function()
{
	return new Promise(function(resolve, reject) 
	{
		socket.emit("getTemp");
		socket.on("tempReturn", function(temp)
		{
			resolve(temp);
		});

	});
}
var getDesiredTemp = function()
{
	return new Promise(function(resolve, reject) 
	{
		socket.emit("getDesiredTemp");
		socket.on("desiredTempReturn", function(temp)
		{
			resolve(temp);
		});

	});
}

/* Call back function for add button */
function tempSetProcedure()
{

	popupContainer.style.display = "block";

	/* Initialize to 0 ingredeints */
	var ingredients = [];
	/* Function refills HTML elements based on contents of ingredients[] */
	$("#popupContainer").load('HTML/temperature.html', function()
	{
		var minusButton = document.getElementById("tempMinus");
		var plusButton = document.getElementById("tempPlus");
		var setTempExitButton = document.getElementById("setTempExitButton");
		var currentTemp = document.getElementById("currentTemp");
		var desiredTemp = document.getElementById("desiredTemp");

		getTemp().then(function(temp) 
		{
			currentTemp.innerHTML = temp;
			getDesiredTemp().then(function(dtemp) 
			{
				desiredTemp.innerHTML = dtemp;
				minusButton.onclick = function()
				{
					var temp = Number(desiredTemp.innerHTML);
					temp -=1;
					socket.emit("setTemperature", temp);
					tempSetProcedure(socket);
				}
				plusButton.onclick = function()
				{
					var temp = Number(desiredTemp.innerHTML);
					temp +=1;
					socket.emit("setTemperature", temp);
					tempSetProcedure(socket);
				}
				setTempExitButton.onclick = function()
				{
					popupContainer.style.display = "none";
				}


			}, function(err) 
			{
			console.log(err);
			});
		}, function(err) 
		{
		console.log(err);
		});
	});
}

function setupTempListeners()
{
	var setTemperatureButton = document.getElementById("setTemperature");
	setTemperatureButton.onclick = function()
	{
		tempSetProcedure();
	}
}