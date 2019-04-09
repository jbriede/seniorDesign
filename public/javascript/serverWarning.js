

function setupServerWarnings()
{
    socket.on("lowVolumeWarning", function(tank)
    {
        smallPopupContainer.style.display = "block";
        $("#smallPopupContainer").load('HTML/lowVolumePopup.html', function()
        {
            var warningText = document.getElementById("lowVolumeText");
            warningText.innerHTML = "Warning, Tank " + tank.id + " (" + tank.name + ") is almost empty";
            var exitButton = document.getElementById("lowVolExit");
            exitButton.onclick = function()
            {
                smallPopupContainer.style.display = "none";
                buttonBlocker.style.display = "none";
            }
        });
    });
}