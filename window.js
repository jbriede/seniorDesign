const {app, BrowserWindow} = require('electron')


app.on('ready', function()
{
	let win = new BrowserWindow({width: 800, height: 480, frame:false}); 
	win.setMenu(null);

	win.loadURL('http://localhost:3000');
});
