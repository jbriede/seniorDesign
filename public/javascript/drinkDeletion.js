/*
 * Show drinks to delete
 */

var drinkDeleteContainer = document.getElementById("drinkDeleteContainer");

var drinksDiv = document.getElementById("drinkDeletionOptions");

/* Call back function for add button */
function deleteDrinkProcedure(socket)
{
	return new Promise(function(resolve, reject) {


		drinksDiv.innerHTML = "";
		drinkDeleteContainer.style.display = "block";
		var completeButton = document.getElementById("drinkDeleteCompleteButton");
		completeButton.onclick = function()
		{
			drinkDeleteContainer.style.display = "none";
			resolve();
		}
		getCombinations(socket).then(function(combinations) 
		{
			for (var i = 0; i < combinations.length; i++)
			{
				drinksDiv.innerHTML = drinksDiv.innerHTML + "<div id=\"deleteCombination-" + combinations[i].id + "\" class=\"deleteItem\">" + combinations[i].name + "<div>";
			}
			for (var i = 0; i < combinations.length; i++)
			{
				document.getElementById("deleteCombination-" + combinations[i].id).onclick = function()
				{
					var id = parseInt(this.id.substr(this.id.lastIndexOf('-')+1, this.id.length));
					socket.emit("deleteCombination", id)	
					deleteDrinkProcedure(socket);
					resolve();
				};
			}
		}, function(err) 
		{
		  reject(err);
		});
	});
}

