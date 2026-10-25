import { ipcMain, dialog } from 'electron'
import { IPC } from '@shared/ipc/channels'
import { loadConfig, saveConfig, getDefaultConfig } from '../services/config-service'
import type { AppConfig } from '@shared/ipc/types'

export const registerConfigIpc = (): void => {
  ipcMain.handle(IPC.config.load, async () => {
    return await loadConfig()
  })

  ipcMain.handle(IPC.config.save, async (_event, config: AppConfig) => {
    await saveConfig(config)
    return true
  })

  ipcMain.handle(IPC.config.selectDirectory, async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory', 'createDirectory']
    })
    if (!result.canceled && result.filePaths.length > 0) {
      return result.filePaths[0]
    }
    return null
  })

  ipcMain.handle(IPC.config.getDefault, async () => {
    return getDefaultConfig()
  })
}
