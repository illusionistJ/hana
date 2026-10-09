import { app, BrowserWindow, ipcMain } from 'electron'
import { IPC } from '@shared/ipc/channels'

const getWin = (e: Electron.IpcMainInvokeEvent): BrowserWindow | null =>
  BrowserWindow.fromWebContents(e.sender)

export const registerWindowIpc = (): void => {
  // 1) Mimize
  ipcMain.handle(IPC.window.minimize, (e) => {
    getWin(e)?.minimize()
  })

  // 2) toggle maximize
  ipcMain.handle(IPC.window.toggleMaximize, (e) => {
    const win = getWin(e)
    if (!win) return
    win.isMaximized() ? win.unmaximize() : win.maximize()
  })

  // 3) close
  ipcMain.handle(IPC.window.close, (e) => {
    getWin(e)?.close()
  })

  // 4) 현재 상태 조회 (초기 아이콘 표시용)
  ipcMain.handle(IPC.window.isMaximized, (e) => {
    return getWin(e)?.isMaximized() ?? false
  })

  app.on('browser-window-created', (_e, win) => {
    const send = (state: boolean): void => {
      if (!win.isDestroyed()) {
        win.webContents.send(IPC.window.onMaximizeChange, state)
      }
    }
    win.on('maximize', () => send(true))
    win.on('unmaximize', () => send(false))
  })
}
