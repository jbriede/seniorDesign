var combinationsContainer = document.getElementById("combinations");

/* Ask server for list of drink combos */
var getCombinations = function()
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

/* Client copy of drink list */
var combinationsG = [];



/* This is called when the app starts and everytime something changes */
var loadCombinations = function()
{
	combinationsContainer.innerHTML = "";

	/* Get drinks from server */
	getCombinations().then(function(combinations) 
	{
		combinationsG = combinations;
		getTanks().then(function(tanks) 
		{
			/* Build the HTML */
			for (var i = 0; i < combinations.length; i++)
			{
				combinationsContainer.innerHTML += "<div id =\"combination-" + combinations[i].id + "\">" + combinations[i].name  + "</div>";
			}
			/* Set up the on click listeners */
			for (var i = 0; i < combinations.length; i++)
			{
				document.getElementById("combination-" + combinations[i].id).onclick = function()
				{
					var id = parseInt(this.id.substr(this.id.lastIndexOf('-')+1, this.id.length));
					$("#popupContainer").load('HTML/dispense.html', function()
					{
						var dispensePopup = document.getElementById("dispensePopup");
						var dispenseIngredients = document.getElementById("dispenseIngredients");
						var dispenseButton = document.getElementById("dispenseButton");
						var dispenseExitButton = document.getElementById("dispenseExitButton");
						var dispenseTitle = document.getElementById("mediumPopupTitle");
						popupContainer.style.display = "block";
						var drink = {};
						/* So the drink ids dont line up with their array indices */
						for (var i = 0; i < combinationsG.length; i+=1)
						{
							if (combinationsG[i].id == id)
							{
								drink = combinationsG[i];
								break;
							}
						}
						/* input name */
						dispenseTitle.innerHTML = drink.name;
						/* input ingredients */
						for (var ingredientIndex = 0; ingredientIndex < drink.ingredients.length; ingredientIndex+=1)
						{
							dispenseIngredients.innerHTML += "<div class=\"dispenseIngredientsItem\">" + drink.ingredients[ingredientIndex].parts + " parts "+ tanks[drink.ingredients[ingredientIndex].tankId].name + "</div>"
						}
						/* Set up buttons */
						dispenseButton.onclick = function()
						{
							var dispenseObj = {}
							dispenseObj.id = id;
							dispenseObj.mL = 300;
							socket.emit("dispenseCombination", id);
						}
						dispenseExitButton.onclick = function()
						{
							popupContainer.style.display = "none";
						}
	
					});
				}
	
			}
		}, function(err)
		{
			console.log(err)
		});

	}, function(err) 
	{
	  console.log(err); 
	});
}

