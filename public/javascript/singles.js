

/* Ask server for list of tanks */
var getTanks = function()
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
var is_on = false;
var tanksDiv = document.getElementById("singles");
var loadSingles = function()
{
    getTanks().then(function(tanks) 
	{
        tanksDiv.innerHTML = "";
        for (var tanksIndex = 0; tanksIndex < tanks.length; tanksIndex++)        
        {
			if (tanks[tanksIndex].available)
			{
				tanksDiv.innerHTML += "<button class=\"singlesButton\" id=\"dispenseButton-" + tanksIndex + "\">" + tanks[tanksIndex].name + "</button>";
			}
			else
			{
				tanksDiv.innerHTML += "<button class=\"singlesButton unavailable\" id=\"dispenseButton-" + tanksIndex + "\">" + tanks[tanksIndex].name + "</button>";
			}
		}
		for (var tanksIndex = 0; tanksIndex < tanks.length; tanksIndex++)        
        {
			if (tanks[tanksIndex].available)
			{
				var dispenseButton = document.getElementById("dispenseButton-" + tanksIndex);
				
				dispenseButton.onclick = function()
				{
					if (is_on)
					{
						var id = parseInt(this.id.substr(this.id.lastIndexOf('-')+1, this.id.length));
						socket.emit("stopDispense", id);
						loadCombinations();
						loadSingles();
						is_on = false;
					}
					else
					{
						var id = parseInt(this.id.substr(this.id.lastIndexOf('-')+1, this.id.length));
						socket.emit("dispenseSingleDrink", id);
						is_on = true;
					}
				}
			}
        }
    }, function(err) 
	{
	  console.log(err); 
	});
}