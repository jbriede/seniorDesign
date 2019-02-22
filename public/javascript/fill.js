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

                        var tankNameText = document.getElementById("tankNameText");

                        tankNameText.value = tanks[id].name;

                        var defaultFillOptions = document.getElementById("defaultFillOptions");
                        defaultFillOptions.innerHTML += "<option value=\"fillVal-0\">1/4 (.5 L)</option>";
                        defaultFillOptions.innerHTML += "<option value=\"fillVal-1\">1/2 (1 L)</option>";
                        defaultFillOptions.innerHTML += "<option value=\"fillVal-2\">Full (2 L)</option>";
                        defaultFillOptions.innerHTML += "<option value=\"fillVal-3\">Custom</option>";
                        var customFillDiv = document.getElementById("customFillDiv");
                        defaultFillOptions.onchange = function()
                        {
                            var fillSelection = parseInt(this.value.substr(this.value.lastIndexOf('-')+1, this.value.length));
                            if (fillSelection == 3)
                            {
                                customFillDiv.style.display = "block";
                            }
                            else
                            {
                                customFillDiv.style.display = "none";
                            }
                        }
                        fillConfirmButton.onclick = function()
                        {
                            var newTankParams = {};
                            newTankParams.name = tankNameText.value;
                            newTankParams.pin = tanks[id].pin;

                            newTankParams.aprox_mL = 500;
                            var fillSelection = parseInt(defaultFillOptions.value.substr(defaultFillOptions.value.lastIndexOf('-')+1, defaultFillOptions.value.length));
                            if (fillSelection == 1)
                            {
                                newTankParams.aprox_mL = 1000;
                            }
                            else if (fillSelection == 1)
                            {
                                newTankParams.aprox_mL = 1500;
                            }
                            else if (fillSelection == 2)
                            {
                                newTankParams.aprox_mL = 1500;
                            }
                            else
                            {
                                var tankMLText = document.getElementById("tankMLText");
                                newTankParams.aprox_mL = parseInt(tankMLText.value);
                            }
                            var newLiquidCheckbox = document.getElementById("newLiquidCheckbox");
                            newTankParams.new = newLiquidCheckbox.checked;
                            newTankParams.id = id;
                            socket.emit("newTankParams", newTankParams);
                        }   

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