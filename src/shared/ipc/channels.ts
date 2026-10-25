export const IPC = {
  window: {
    minimize: 'window:minimize',
    toggleMaximize: 'window:toggleMaximize',
    close: 'window:close',
    isMaximized: 'window:isMaximized',
    onMaximizeChange: 'window:maximize-change',
    getVersion: 'window:getVersion'
  },
  config: {
    load: 'config:load',
    save: 'config:save',
    selectDirectory: 'config:selectDirectory',
    getDefault: 'config:getDefault'
  }
} as const
