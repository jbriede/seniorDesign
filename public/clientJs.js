var socket = io();

var drinkContainer = document.getElementById("right");
for (var i = 0; i < 3; i++)
{
	drinkContainer.innerHTML += "<div> Drink Combo " + i  + "</div>";
}

var addDrinkButton = document.getElementById("addDrinkButton");
var drinkAdditionContainer = document.getElementById("drinkAdditionContainer");
var ingredientsContainer = document.getElementById("ingredientContainer");

var item0 = {"id": 0, "name": "Lemonade", "available": true};
var item1 = {"id": 1, "name": "Iced Tea", "available": true};
var item2 = {"id": 2, "name": "Coke", "available": true};
var item3 = {"id": 3, "name": "Sprite", "available": true};
var item4 = {"id": 4, "name": "Rum", "available": true};
var tankArray = [item0, item1, item2, item3, item4];

function addDrinkProcedure()
{
	drinkAdditionContainer.style.display = "block";
	var ingredients = [];

	function rebuildIngredeints()
	{
		/* First Set Up Text */
		ingredientContainer.innerHTML = "";
		for (var ingredientsIndex = 0; ingredientsIndex < ingredients.length; ingredientsIndex++)
		{
			var optionString = "";
			for (var index = 0; index < tankArray.length; index++)
			{
				optionString += "<option value=" + tankArray[index].id + ">" + tankArray[index].name + "</option>"
			}
			ingredientContainer.innerHTML += "<div class=\"ingredientItem\" id=\"ingredientItem-" + ingredientsIndex +"\"><select id=\"selector-" + ingredientsIndex + "\">" + optionString + "</select><span class=\"minus\" id=\"minus-" + ingredientsIndex + "\">-</span><span class=\"quantity\" id=\"quantity-" + ingredientsIndex + "\">" + ingredients[ingredientsIndex].oz.toFixed(1) + " oz</span><span class=\"plus\" id=\"plus-" + ingredientsIndex + "\">+</span><span class=\"delete\" id=\"delete-" + ingredientsIndex + "\">Delete</span></div>";

		}
		/* Now set up listeners */
		for (var ingredientsIndex = 0; ingredientsIndex < ingredients.length; ingredientsIndex++)
		{
			/* Delete Listener */
			document.getElementById("delete-" + ingredientsIndex).onclick = function()
			{
				var id = parseInt(this.id.substr(this.id.lastIndexOf('-')+1, this.id.length));
				var ingredients2 = [];
				var count = 0;
				for (var ingredientsIndex2 = 0; ingredientsIndex2 < ingredients.length; ingredientsIndex2++)
				{
					if (id != ingredientsIndex2)
					{
						ingredients2[count] = ingredients[ingredientsIndex2];
						count++;
					}
				}
				ingredients = ingredients2;
				rebuildIngredeints();
			}
			/* Plus Listener */
			document.getElementById("minus-" + ingredientsIndex).onclick = function()
			{
				var id = parseInt(this.id.substr(this.id.lastIndexOf('-')+1, this.id.length));
				
				if (!(ingredients[id].oz < 0.1))
				{
					ingredients[id].oz -= 0.1000000000;
				}
				rebuildIngredeints();
			}


			/* Minus Listener */
			document.getElementById("plus-" + ingredientsIndex).onclick = function()
			{
				var id = parseInt(this.id.substr(this.id.lastIndexOf('-')+1, this.id.length));
				if (!(ingredients[id].oz > 12.0))
				{
					ingredients[id].oz += 0.1000000000;
				}
				rebuildIngredeints();
			}

			/* Selector Listener and value */
			document.getElementById("selector-" + ingredientsIndex).value = ingredients[ingredientsIndex].tankId;
			document.getElementById("selector-" + ingredientsIndex).onchange = function()
			{
				var id = parseInt(this.id.substr(this.id.lastIndexOf('-')+1, this.id.length));
				var tankId = document.getElementById("selector-" + id).value;
				ingredients[id].tankId = tankId;
			}
		}
	}

	addIngredientButton.onclick = function()
	{
		ingredients.push({"tankId": 0, "oz": 0});
		rebuildIngredeints();
	}


	addIngredientButton.click();

	var exitButton = document.getElementById("drinkAdditionExitButton");
	exitButton.onclick = function()
	{
		ingredientContainer.innerHTML = "";
		drinkAdditionContainer.style.display = "none";
		document.getElementById("drinkNameText").value = "";
	}

	var completeButton = document.getElementById("drinkAdditionCompleteButton");
	completeButton.onclick = function()
	{
		var drink = {};
		drink.name = document.getElementById("drinkNameText").value;
		drink.ingredients = ingredients;
		socket.emit("newDrink", drink);
		exitButton.click();
	}
}

addDrinkButton.onclick = function()
{
	addDrinkProcedure();
}
