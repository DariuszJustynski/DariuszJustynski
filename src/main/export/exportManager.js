const path = require('path');
const { ensureDir } = require('../utils/fsSafe');
const { makeFolderName } = require('./namePolicy');
const { exportHtml } = require('./exporters/htmlExporter');
const { exportPdf } = require('./exporters/pdfExporter');
const { exportTxt } = require('./exporters/txtExporter');
const { writeManifest } = require('./exporters/manifestWriter');

async function waitForLoad(webContents) {
  await new Promise((resolve) => {
    const onLoad = () => {
      webContents.removeListener('did-fail-load', onLoad);
      resolve();
    };
    webContents.once('did-finish-load', onLoad);
    webContents.once('did-fail-load', onLoad);
  });
}

async function runExport({ mainWindow, items, formats, outputDir, viewManager }) {
  const results = [];
  await ensureDir(outputDir);

  const webContents = viewManager.getWebContents();

  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];
    const dirName = makeFolderName(item.title, new Date());
    const dirPath = path.join(outputDir, dirName);

    try {
      await ensureDir(dirPath);
      await writeManifest(dirPath, { url: item.url, title: item.title }, []);

      mainWindow.webContents.send('EXPORT_PROGRESS', {
        step: i + 1,
        total: items.length,
        itemId: item.id,
        message: `Opening ${item.url}`,
      });

      await webContents.loadURL(item.url);
      await waitForLoad(webContents);

      const files = [];

      if (formats.html) {
        files.push(await exportHtml(webContents, path.join(dirPath, 'chat.html')));
      }
      if (formats.pdf) {
        files.push(await exportPdf(webContents, path.join(dirPath, 'chat.pdf')));
      }
      if (formats.txt) {
        files.push(await exportTxt(webContents, path.join(dirPath, 'chat.txt')));
      }

      await writeManifest(dirPath, { url: item.url, title: item.title }, files);

      results.push({ id: item.id, ok: true, dirName, files });
    } catch (error) {
      results.push({ id: item.id, ok: false, error: error.message });
    }
  }

  mainWindow.webContents.send('EXPORT_DONE', { results });
  return results;
}

module.exports = {
  runExport,
};
