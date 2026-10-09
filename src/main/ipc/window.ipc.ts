import { BrowserWindow, ipcMain } from 'electron'
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
}
