const electron = require('electron');
const url = require('url');
const path = require('path');
const { Menu } = require('electron');
const { app, BrowserWindow } = electron;
const { mainMenuTemplate } = require('./templates/MainMenu');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    // Load Html file to the window
    mainWindow.loadURL(
        url.format({
          pathname: path.join(__dirname, "./static/mainWindow.html"),
          protocol: "file",
          slashes: true,
        })
    );

    // Quit app when closed
    mainWindow.on('closed', function(){
        app.quit();
    })

    // Build the menu from the template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert Menu
    Menu.setApplicationMenu(mainMenu);
});