/*
This program needs to:
- control the GUI
- Control the flow
- Detect low water level?
- regulate temperature
*/

var GUI = require('./GUIBackend');

backend = new GUI.GUIBackend()
backend.setupServer()