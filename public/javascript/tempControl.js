/*
 * Show show temp controls
 */

var getTemp = function(socket)
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
var getDesiredTemp = function(socket)
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

var setTempPopup = document.getElementById("setTempPopup");
var currentTemp = document.getElementById("currentTemp");
var desiredTemp = document.getElementById("desiredTemp");

var minusButton = document.getElementById("tempMinus");
var plusButton = document.getElementById("tempPlus");
var setTempExitButton = document.getElementById("setTempExitButton");


/* Call back function for add button */
function tempSetProcedure(socket)
{
	setTempPopup.style.display = "block";
	getTemp(socket).then(function(temp) 
	{
		currentTemp.innerHTML = temp;
		getDesiredTemp(socket).then(function(dtemp) 
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
				setTempPopup.style.display = "none";
			}


		}, function(err) 
		{
		  console.log(err);
		});
	}, function(err) 
	{
	  console.log(err);
	});
}

