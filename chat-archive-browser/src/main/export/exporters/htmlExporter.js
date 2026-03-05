async function exportHtml(webContents, filePath) {
  await webContents.savePage(filePath, 'HTMLOnly');
  return { type: 'html', path: 'chat.html' };
}

module.exports = {
  exportHtml,
};
