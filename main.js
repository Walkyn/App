const { app, BrowserWindow, screen } = require('electron');

const createWindow = () => {

    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    const window = new BrowserWindow({
        width: width,
        height: height,
        minWidth: 785,
        minHeight: 518,
        webPreferences: {
            nodeIntegration: true
        }
    });
    window.loadFile('src/index.html');
    window.setMenu(null);
};

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
