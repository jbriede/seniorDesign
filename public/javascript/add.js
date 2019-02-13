

/*
 * This is entirely responsible for what happens when the add drink burron is pressed 
 */

/* How much does the plus minus change the val */




var oz_inc_dec_size = 2;


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
            /* Function refills HTML elements based on contents of ingredients[] */
            $("#popupContainer").load('HTML/add.html', function()
            {
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
                        ingredientContainer.innerHTML += "<div class=\"ingredientItem\" id=\"ingredientItem-" + ingredientsIndex +"\"><select id=\"selector-" + ingredientsIndex + "\">" + optionString + "</select><span class=\"minus\" id=\"minus-" + ingredientsIndex + "\">-</span><span class=\"quantity\" id=\"quantity-" + ingredientsIndex + "\">" + ingredients[ingredientsIndex].oz.toFixed(1) + " oz</span><span class=\"plus\" id=\"plus-" + ingredientsIndex + "\">+</span><span class=\"delete\" id=\"delete-" + ingredientsIndex + "\">Delete</span></div>";
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
                            rebuildIngredeints();
                        }
                        /* Plus Listener */
                        document.getElementById("minus-" + ingredientsIndex).onclick = function()
                        {
                            var id = parseInt(this.id.substr(this.id.lastIndexOf('-')+1, this.id.length));
                            /*Just change value in array and redraw */
                            if (!(ingredients[id].oz < 0.1))
                            {
                                ingredients[id].oz -= oz_inc_dec_size;
                            }
                            rebuildIngredeints();
                        }

                        /* Minus Listener */
                        document.getElementById("plus-" + ingredientsIndex).onclick = function()
                        {
                            var id = parseInt(this.id.substr(this.id.lastIndexOf('-')+1, this.id.length));
                            /* Just change value in array and redraw */
                            if (!(ingredients[id].oz > 12.0))
                            {
                                ingredients[id].oz += oz_inc_dec_size
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
                    /* By default use whatever is in first tank */
                    ingredients.push({"tankId": 0, "oz": 0});
                    /* Now redraw to update html */
                    rebuildIngredeints();
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
