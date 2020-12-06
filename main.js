const {app, ipcMain,  BrowserWindow, Tray, shell, nativeImage } = require('electron');
const path = require('path');
const electron = require('electron');
const Menu = electron.Menu;
const { autoUpdater } = require('electron-updater');
app.commandLine.appendSwitch ("disable-http-cache");
let tray = null;
const prgName = 'Genshin Launcher';

/*/////////////////////////////
//////////////////////////////
*////////////////////////////

require('electron-reload')(__dirname);
function createWindow () {
//Настройки окна приложения 
  const mainWindow = new BrowserWindow({
    height: 720,
    width:  1280,
    backgroundColor: '#2b2b2b',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true, enableRemoteModule: true
    },
    frame: false,
    fullscreen: false,
    center: true,
    resizable: false,
  });
  //Загружаемый файл приложения
  mainWindow.loadFile('./pages/index.html');
  
  //Иконка в трее
  const iconPath = path.join('./favicon.ico');
  let tray = mainWindow.tray = new Tray(nativeImage.createFromPath(iconPath));
  //Контекстное меню трея
  let template = [
    {
      label: 'Выйти',click:  function(){
        app.isQuiting = true;
        app.quit();
      }
    }
  ]
  const ctxMenu = Menu.buildFromTemplate(template);
  tray.setContextMenu(ctxMenu);
  tray.setToolTip(prgName)
  //Набор разработчика
  // mainWindow.webContents.openDevTools();
  mainWindow.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify();
  
  });
  mainWindow.webContents.openDevTools();

};


app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
});
var p = path.join(__dirname, '..', 'favicon.png');


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});
// Force-color
app.commandLine.appendSwitch('force-color-profile', 'srgb');

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});

autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available');
});
autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded');
});
ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});
