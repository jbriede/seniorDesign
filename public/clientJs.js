var drinkContainer = document.getElementById("right");
for (var i = 0; i < 7; i++)
{
	drinkContainer.innerHTML += "<div> Drink Combo " + i  + "</div>";
}

var addDrinkButton = document.getElementById("addDrinkButton");
var drinkAdditionContainer = document.getElementById("drinkAdditionContainer");
var ingredientsContainer = document.getElementById("ingredientContainer");
addDrinkButton.onclick = function()
{
	drinkAdditionContainer.style.display = "block";
	addIngredientButton.onclick = function()
	{
		ingredientContainer.innerHTML = ingredientContainer.innerHTML + "<div class=\"ingredientItem\" id=\"ingredientItem-1\"><select><option value=\"Rum\">Rum</option></select><span class=\"minus\">-</span><span class=\"quantity\">0.0 oz</span><span class=\"plus\">+</span></div>"
	}
}

