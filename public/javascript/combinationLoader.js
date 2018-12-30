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

var combinationsG = [];

var dispensePopup = document.getElementById("dispensePopup");
var dispenseIngredients = document.getElementById("dispenseIngredients");
var dispenseButton = document.getElementById("dispenseButton");
var dispenseExitButton = document.getElementById("dispenseExitButton");
var dispenseTitle = document.getElementById("dispenseTitle");



var loadCombinationsProcedure = function(socket)
{
	combinationsContainer.innerHTML = "";
	getCombinations(socket).then(function(combinations) 
	{
		combinationsG = combinations;
		
		for (var i = 0; i < combinations.length; i++)
		{
			combinationsContainer.innerHTML += "<div id =\"combination-" + combinations[i].id + "\">" + combinations[i].name  + "</div>";
		}
		for (var i = 0; i < combinations.length; i++)
		{
			document.getElementById("combination-" + combinations[i].id).onclick = function()
			{
				var id = parseInt(this.id.substr(this.id.lastIndexOf('-')+1, this.id.length));
				dispensePopup.style.display = "block";
				dispenseIngredients.innerHTML = "";
				var drink = {};
				for (var i = 0; i < combinationsG.length; i+=1)
				{
					if (combinationsG[i].id == id)
					{
						drink = combinationsG[i];
					}
				}
				dispenseTitle.innerHTML = drink.name;

				for (var ingredientIndex = 0; ingredientIndex < drink.ingredients.length; ingredientIndex+=1)
				{
					dispenseIngredients.innerHTML += "<div class=\"dispenseIngredientsItem\">" + drink.ingredients[ingredientIndex].oz + "oz of "+ tankArray[drink.ingredients[ingredientIndex].tankId].name + "</div>"
				}
				dispenseButton.onclick = function()
				{
					socket.emit("dispenseCombination", id);
				}
				dispenseExitButton.onclick = function()
				{
					dispensePopup.style.display = "none";
				}

			}

		}
	}, function(err) 
	{
	  console.log(err); 
	});
}

