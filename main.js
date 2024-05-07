import { app, BrowserWindow } from 'electron';
import { join } from 'path';

let win;

function createWindow() {
  // Cria a janela do navegador
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });

  // Carrega o arquivo HTML
  win.loadURL(`file://${join(__dirname, '../dist/index.html')}`); // Arquivo HTML da build de produção
}

// Evento quando o Electron está pronto
app.whenReady().then(createWindow);

// Sair quando todas as janelas forem fechadas
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Criar uma nova janela quando ativada (macOS)
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});