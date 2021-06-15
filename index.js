"use strict";

const isDevMode = process.env.NODE_ENV === 'development';
const electron = require('electron');
const Tray = electron.Tray;
const Menu = electron.Menu;
const path = require('path');
const config = require('./config');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const childProcess = require('child_process');

let mainWindow;

let tray = null;

function createWindow() {
  const {screenWidth, screenHeight} = electron.screen.getPrimaryDisplay().workAreaSize;
  const width = 1920;
  const height = 1080;
  const x = (screenWidth - width) / 2;
  const y = (screenHeight - width) / 2;
  mainWindow = new BrowserWindow({
    fullscreenable: true,
    defaultEncoding: "utf8",
    kiosk : config.kiosk,
    frame : true,
    autoHideMenuBar : true,
    x: x,
    y: y,
    width: width,
    height: height,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadURL(`file://${__dirname}/src/index.html`);
  mainWindow.webContents.on('dom-ready', () => {
    if(isDevMode) {
      mainWindow.webContents.openDevTools();
    }
  });
}

app.on('ready', () => {
  tray = new Tray(path.join(__dirname, './src/icon/Shell32_dll_140.ico'))
  const contextMenu = Menu.buildFromTemplate([
    { label: `${app.getName()} version : ${app.getVersion()}` },
    { label: 'open config' , click() {
      
      childProcess.spawn('C:/windows/notepad.exe', [path.join(__dirname, '/config.js')]);
    }}
  ])
  tray.setToolTip(`${app.getName()}\nversion : ${app.getVersion()}`)
  tray.setContextMenu(contextMenu)
  createWindow();
});

app.on('window-all-closed', () => {
  app.quit();
});