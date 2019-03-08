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




/* This is called when the app starts and everytime something changes */
var loadCombinations = function()
{
	combinationsContainer.innerHTML = "";

	/* Get drinks from server */
	getCombinations().then(function(combinations) 
	{
		//combinationsG = combinations;
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
					buttonBlocker.style.display = "block";
					$("#popupContainer").load('HTML/dispense.html', function()
					{
						var dispensePopup = document.getElementById("dispensePopup");
						var dispenseIngredients = document.getElementById("dispenseIngredients");
						var dispense6 = document.getElementById("dispenseButton_6");
						var dispense8 = document.getElementById("dispenseButton_8");
						var dispense10 = document.getElementById("dispenseButton_10");
						var dispense12 = document.getElementById("dispenseButton_12");
						var dispenseExitButton = document.getElementById("dispenseExitButton");
						var dispenseTitle = document.getElementById("mediumPopupTitle");
						popupContainer.style.display = "block";
						var drink = {};
						/* So the drink ids dont line up with their array indices */
						for (var i = 0; i < combinations.length; i+=1)
						{
							if (combinations[i].id == id)
							{
								drink = combinations[i];
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

						function waitAndClose()
						{
							smallPopupContainer.style.display = "block";
							buttonBlocker.style.display = "block";
							$("#smallPopupContainer").load('HTML/waiting.html', function()
							{
								setTimeout(function(){ 
									dispenseExitButton.click();
									smallPopupContainer.style.display = "none";
									buttonBlocker.style.display = "none";
								}, 5000);
							})
						}

						/* Set up buttons */
						dispense6.onclick = function()
						{
							var dispenseObj = {}
							dispenseObj.id = id;
							dispenseObj.ml = 6 * 29.5735; // convert to mL
							socket.emit("dispenseCombination", dispenseObj);
							waitAndClose();
						}
						dispense8.onclick = function()
						{
							var dispenseObj = {}
							dispenseObj.id = id;
							dispenseObj.ml = 8 * 29.5735; // convert to mL
							socket.emit("dispenseCombination", dispenseObj);
							waitAndClose();
						}
						dispense10.onclick = function()
						{
							var dispenseObj = {}
							dispenseObj.id = id;
							dispenseObj.ml = 10 * 29.5735; // convert to mL
							socket.emit("dispenseCombination", dispenseObj);
							waitAndClose();
						}
						dispense12.onclick = function()
						{
							var dispenseObj = {}
							dispenseObj.id = id;
							dispenseObj.ml = 12 * 29.5735; // convert to mL
							socket.emit("dispenseCombination", dispenseObj);
							waitAndClose();
						}
						dispenseExitButton.onclick = function()
						{
							popupContainer.style.display = "none";
							buttonBlocker.style.display = "none";
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

