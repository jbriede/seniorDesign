/*
 * Show drinks to delete
 */

/* Call back function for add button */
function deleteDrinkProcedure()
{
	return new Promise(function(resolve, reject) {
        popupContainer.style.display = "block";
        $("#popupContainer").load('HTML/remove.html', function()
        {
            var drinkDeleteContainer = document.getElementById("drinkDeleteContainer");
            var completeButton = document.getElementById("drinkDeleteCompleteButton");
            var drinksDiv = document.getElementById("drinkDeletionOptions");
            completeButton.onclick = function()
            {
                popupContainer.style.display = "none";
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
                        loadCombinations();
                        deleteDrinkProcedure(socket);
                        resolve();
                    };
                }
            }, function(err) 
            {
            reject(err);
            });
        });
	});
}

function setupRemoveListeners()
{
    var removeDrinkButton = document.getElementById("deleteDrinkButton");
    removeDrinkButton.onclick = function()
    {
        deleteDrinkProcedure().then(function(result) 
        {
            /* Once the new drink has been sent to the server, the promise will resolve */
            setTimeout(function(){ loadCombinations(); }, 1000);
            
        }, function(err) 
        {
        console.log(err); // Error: "It broke"
        });
    }
}