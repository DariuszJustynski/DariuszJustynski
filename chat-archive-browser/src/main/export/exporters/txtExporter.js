const fs = require('fs/promises');

async function exportTxt(webContents, filePath) {
  const title = webContents.getTitle();
  const url = webContents.getURL();
  let body = '';

  try {
    body = await webContents.executeJavaScript('document.body ? document.body.innerText : ""', true);
  } catch {
    body = '';
  }

  const content = [
    `Title: ${title}`,
    `URL: ${url}`,
    `SavedAt: ${new Date().toISOString()}`,
    '',
    body,
  ].join('\n');

  await fs.writeFile(filePath, content, 'utf8');
  return { type: 'txt', path: 'chat.txt' };
}

module.exports = {
  exportTxt,
};
