/*
 * Main GUI javascript to organize other javascript files
 */



var socket = io();

var popupContainer = document.getElementById("popupContainer");
var smallPopupContainer = document.getElementById("smallPopupContainer");
var buttonBlocker = document.getElementById("buttonBlocker");

var start = function()
{
    /* I hate jquery but I need it for this i guess. */
    $("#menuContainer").load('HTML/menu.html', function()
    {
        setupAddListeners();
        setupRemoveListeners();
        setupTempListeners();
        setupFillPopupListeners();
        setupCleanListeners();
        setupServerWarnings();
    });
    loadCombinations();
    loadSingles();
}


start();
