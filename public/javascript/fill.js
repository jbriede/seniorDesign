/*
 * Show drinks to delete
 */

/* Call back function for add button */
function fillProcedure()
{
	return new Promise(function(resolve, reject) {
        popupContainer.style.display = "block";
        $("#popupContainer").load('HTML/fill.html', function()
        {
            var exitButton = document.getElementById("fillExitButton");
            var fillConfirmButton = document.getElementById("fillConfirmButton");
            exitButton.onclick = function()
            {
                popupContainer.style.display = "none";
                resolve();
            }

            var combosField = document.getElementById("combosSelection");
            var tankOptions = document.getElementById("tankOptions");
            var tankFillTitle = document.getElementById("tankFillTitle");
            getTanks(socket).then(function(tanks) 
            {
                for (var i = 0; i < tanks.length; i++)
                {
                    combosField.innerHTML = combosField.innerHTML + "<div id=\"configCombination-" + i + "\" class=\"configItem\">" + "Tank "+ (i+1) + " (" + tanks[i].name + ")<div>";
                }
                for (var i = 0; i < tanks.length; i++)
                {
                    document.getElementById("configCombination-" + i).onclick = function()
                    {
                        var id = parseInt(this.id.substr(this.id.lastIndexOf('-')+1, this.id.length));
                        combosSelection.style.display = "none";
                        tankOptions.style.display = "block";
                        tankFillTitle.innerHTML = "Tank " + (id+1) + " Options";
                        fillConfirmButton.style.display = "block";
                    };
                }
            }, function(err) 
            {
            reject(err);
            });

        });
	});
}

function setupFillListeners()
{
    var fillTankButton = document.getElementById("fillTankButton");
    fillTankButton.onclick = function()
    {
        fillProcedure().then(function(result) 
        {
            /* Once the new drink has been sent to the server, the promise will resolve */
            loadSingles();
        }, function(err) 
        {
        console.log(err); // Error: "It broke"
        });
    }
}