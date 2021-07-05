const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow } = electron;

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    // Load Html file to the window
    mainWindow.loadURL(
        url.format({
          pathname: path.join(__dirname, "./templates/mainWindow.html"),
          protocol: "file",
          slashes: true,
        })
    );
});