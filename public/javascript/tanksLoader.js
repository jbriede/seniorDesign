

/* Ask server for list of tanks */
var getTanks = function(socket)
{
	return new Promise(function(resolve, reject) 
	{
		socket.emit("getTanks");
		socket.on("tanks", function(tanks)
		{
			resolve(tanks);
		});

	});
}

/* Client copy of tanks list */
var tanksG = [];

var tanksDiv = document.getElementById("bottom");
var loadTanks = function(socket)
{
    getTanks(socket).then(function(tanks) 
	{
        tanksDiv.innerHTML = "";
        for (var tanksIndex = 0; tanksIndex < tanks.length; tanksIndex++)        
        {
            tanksDiv.innerHTML += "<button class=\"dispenseButton\" id=\"dispenseButton-" + tanksIndex + "\">" + tanks[tanksIndex].name + "</button>";
		}
		for (var tanksIndex = 0; tanksIndex < tanks.length; tanksIndex++)        
        {
			var dispenseButton = document.getElementById("dispenseButton-" + tanksIndex);
			dispenseButton.onmousedown = function()
			{
				var id = parseInt(this.id.substr(this.id.lastIndexOf('-')+1, this.id.length));
				socket.emit("dispenseSingleDrink", id);
			}
			dispenseButton.onmouseup = function()
			{
				socket.emit("stopDispense");
			}
        }
    }, function(err) 
	{
	  console.log(err); 
	});
}