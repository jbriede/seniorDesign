

/*
 * This is entirely responsible for what happens when the add drink burron is pressed 
 */

/* How much does the plus minus change the val */




var parts_inc_dec_size = 1;


var ingredientsContainer = document.getElementById("ingredientContainer");




/* Call back function for add button */
function addDrinkProcedure()
{
	return new Promise(function(resolve, reject) {
		/* Display the container */
		popupContainer.style.display = "block";

		getTanks(socket).then(function(tankArray)
		{
            /* Initialize to 0 ingredeints */
            var ingredients = [];
            var num_ingredients = 0;
            /* Function refills HTML elements based on contents of ingredients[] */
            $("#popupContainer").load('HTML/add.html', function()
            {
                function checkInputParams(name, ingredients)
                {
                    if (name.length > 20)
                    {
                        reportIssue("Name bust be less than 20 chars");
                        return false;
                    }
                    if (name.length <= 0)
                    {
                        reportIssue("Mixture must have name");
                        return false;
                    }

                    for (var index = 0; index < ingredients.length; index++)
                    {
                        if (ingredients[index].parts <= 0)
                        {
                            reportIssue("Can't have an ingredient with 0 parts");
                            return false;
                        }
                    }
                    return true;
                }

                function rebuildIngredeints()
                {
                    /* Build HTML for array */
                    ingredientContainer.innerHTML = "";

                    /* For each ingredient */
                    for (var ingredientsIndex = 0; ingredientsIndex < ingredients.length; ingredientsIndex++)
                    {
                        var optionString = "";
                        /* For each ingredeint in tank, make an option in the selector */
                        for (var index = 0; index < tankArray.length; index++)
                        {
                            optionString += "<option value=" + tankArray[index].id + ">" + tankArray[index].name + "</option>"
                            
                        }
                        /* Long important line of html here */
                        ingredientContainer.innerHTML += "<div class=\"ingredientItem\" id=\"ingredientItem-" + ingredientsIndex +"\"><select id=\"selector-" + ingredientsIndex + "\">" + optionString + "</select><span class=\"minusButton\" id=\"minus-" + ingredientsIndex + "\">-</span><span class=\"quantity\" id=\"quantity-" + ingredientsIndex + "\">" + ingredients[ingredientsIndex].parts.toFixed(1) + " parts</span><span class=\"plusButton\" id=\"plus-" + ingredientsIndex + "\">+</span><span class=\"deleteButton\" id=\"delete-" + ingredientsIndex + "\">Delete</span></div>";
                    }
                    /* Now set up listeners for html array elements */
                    for (var ingredientsIndex = 0; ingredientsIndex < ingredients.length; ingredientsIndex++)
                    {
                        /* Delete button Listener */
                        document.getElementById("delete-" + ingredientsIndex).onclick = function()
                        {
                            var id = parseInt(this.id.substr(this.id.lastIndexOf('-')+1, this.id.length));
                            
                            /* Remake ingredents list without selected ingredient */
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
                            num_ingredients -=1;
                            rebuildIngredeints();
                        }
                        /* Plus Listener */
                        document.getElementById("minus-" + ingredientsIndex).onclick = function()
                        {
                            var id = parseInt(this.id.substr(this.id.lastIndexOf('-')+1, this.id.length));
                            /*Just change value in array and redraw */
                            if (!(ingredients[id].parts < 0.1))
                            {
                                ingredients[id].parts -= parts_inc_dec_size;
                            }
                            rebuildIngredeints();
                        }

                        /* Minus Listener */
                        document.getElementById("plus-" + ingredientsIndex).onclick = function()
                        {
                            var id = parseInt(this.id.substr(this.id.lastIndexOf('-')+1, this.id.length));
                            /* Just change value in array and redraw */
                            if (!(ingredients[id].parts > 12.0))
                            {
                                ingredients[id].parts += parts_inc_dec_size
                            }
                            rebuildIngredeints();
                        }

                        /* Set initial value of selector */
                        document.getElementById("selector-" + ingredientsIndex).value = ingredients[ingredientsIndex].tankId;
                        /* Selector Listener*/
                        document.getElementById("selector-" + ingredientsIndex).onchange = function()
                        {
                            var id = parseInt(this.id.substr(this.id.lastIndexOf('-')+1, this.id.length));
                            var tankId = document.getElementById("selector-" + id).value;
                            /* add tank id to ingredents list */
                            ingredients[id].tankId = tankId;
                        }
                    }
                }

                /* Listener for 'add ingredent' button */
                addIngredientButton.onclick = function()
                {
                    if (num_ingredients < tankArray.length)
                    {
                        /* By default use whatever is in first tank */
                        ingredients.push({"tankId": 0, "parts": 0});
                        /* Now redraw to update html */
                        rebuildIngredeints();
                        num_ingredients +=1;
                    }
                    else
                    {
                        reportIssue("More than " + tankArray.length + " ingredients not allowed.");
                    }
                }

                /* WHen initially loading the ingredients window add 1 element */
                addIngredientButton.click();

                /* Exit an cancel button */
                var exitButton = document.getElementById("drinkAdditionExitButton");
                exitButton.onclick = function()
                {
                    /* Clean things */
                    ingredientContainer.innerHTML = "";
                    popupContainer.style.display = "none";
                    document.getElementById("drinkNameText").value = "";
                    resolve("Stuff worked!");
                }

                /* Drink complete and submit button */
                var completeButton = document.getElementById("drinkAdditionCompleteButton");
                completeButton.onclick = function()
                {
                    if (checkInputParams(document.getElementById("drinkNameText").value, ingredients))
                    {
                        /* Make drink object and send it to the server */
                        var drink = {};
                        drink.name = document.getElementById("drinkNameText").value;
                        drink.ingredients = ingredients;
                        /* We need some promise type stuff here... */
                        socket.emit("newCombination", drink)
                        //resolve("Stuff worked!");
                        /* Call exit... it clears everything */
                        exitButton.click();
                    }
                }
            })
			
		}, function(err)
		{
			console.log(err);
		});


	});
}

function setupAddListeners()
{
    var addDrinkButton = document.getElementById("addDrinkButton");
    addDrinkButton.onclick = function()
    {
        addDrinkProcedure().then(function(result) 
        {
            /* Once the new drink has been sent to the server, the promise will resolve */
            loadCombinations();
        }, function(err) 
        {
        console.log(err); // Error: "It broke"
        });
    }
}
