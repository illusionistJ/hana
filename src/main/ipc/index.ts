import { registerWindowIpc } from './window.ipc'
import { registerConfigIpc } from './config.ipc'

export const registerAllIpc = (): void => {
  registerWindowIpc()
  registerConfigIpc()
}
