
function fillPopupProedure()
{
    smallPopupContainer.style.display = "block";
    $("#smallPopupContainer").load('HTML/prefillPopup.html', function()
    {
        var exitButton = document.getElementById("prefillExit");
        exitButton.onclick = function()
        {
            smallPopupContainer.style.display = "none";
        }
        var fillButton = document.getElementById("prefillFill");
        fillButton.onclick = function()
        {
            smallPopupContainer.style.display = "none";
            fillProcedure();
        }
        var cleanButton = document.getElementById("prefillClean");
        cleanButton.onclick = function()
        {
            smallPopupContainer.style.display = "none";
            cleanProcedure();
        }
    });
}

function setupFillPopupListeners()
{
    var cleanTankButton = document.getElementById("cleanTankButton");
    fillTankButton.onclick = function()
    {
        fillPopupProedure();
    }
}