const { contextBridge, ipcRenderer } = require('electron');
const { IPC_CHANNELS } = require('../main/ipc/ipcChannels');

contextBridge.exposeInMainWorld('api', {
  navGo: (url) => ipcRenderer.invoke(IPC_CHANNELS.NAV_GO, { url }),
  navBack: () => ipcRenderer.invoke(IPC_CHANNELS.NAV_BACK),
  navForward: () => ipcRenderer.invoke(IPC_CHANNELS.NAV_FORWARD),
  navReload: () => ipcRenderer.invoke(IPC_CHANNELS.NAV_RELOAD),
  queueAddCurrent: () => ipcRenderer.invoke(IPC_CHANNELS.QUEUE_ADD_CURRENT),
  queueGetAll: () => ipcRenderer.invoke(IPC_CHANNELS.QUEUE_GET_ALL),
  queueSetChecked: (id, checked) => ipcRenderer.invoke(IPC_CHANNELS.QUEUE_SET_CHECKED, { id, checked }),
  queueRemoveSelected: (ids) => ipcRenderer.invoke(IPC_CHANNELS.QUEUE_REMOVE_SELECTED, { ids }),
  queueClear: () => ipcRenderer.invoke(IPC_CHANNELS.QUEUE_CLEAR),
  settingsGet: () => ipcRenderer.invoke(IPC_CHANNELS.SETTINGS_GET),
  settingsSetOutputDir: (outputDir) => ipcRenderer.invoke(IPC_CHANNELS.SETTINGS_SET_OUTPUT_DIR, { outputDir }),
  settingsSetFormats: (formats) => ipcRenderer.invoke(IPC_CHANNELS.SETTINGS_SET_FORMATS, { formats }),
  exportRunSelected: () => ipcRenderer.invoke(IPC_CHANNELS.EXPORT_RUN_SELECTED),
  onExportProgress: (cb) => ipcRenderer.on(IPC_CHANNELS.EXPORT_PROGRESS, (_evt, payload) => cb(payload)),
  onExportDone: (cb) => ipcRenderer.on(IPC_CHANNELS.EXPORT_DONE, (_evt, payload) => cb(payload)),
});
