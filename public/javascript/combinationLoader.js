var combinationsContainer = document.getElementById("right");

var getCombinations = function(socket)
{
	return new Promise(function(resolve, reject) 
	{
		socket.emit("getCombinations");
		socket.on("combinations", function(newCombinations)
		{
			resolve(newCombinations);
		});

	});
}


var loadCombinationsProcedure = function(socket)
{
	getCombinations(socket).then(function(combinations) 
	{
		combinationsContainer.innerHTML = "";
		for (var i = 0; i < combinations.length; i++)
		{
			combinationsContainer.innerHTML += "<div id =\"combination-" + combinations[i].id + "\">" + combinations[i].name  + "</div>";
		}
	}, function(err) 
	{
	  console.log(err); 
	});
}

