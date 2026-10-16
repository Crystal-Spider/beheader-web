import {readFile} from 'node:fs/promises';
import {createServer} from 'node:http';
import {extname, resolve, sep} from 'node:path';
import {URL, fileURLToPath} from 'node:url';

const root = fileURLToPath(new URL('../docs/', import.meta.url));
const basePath = '/beheader-web/';
const contentTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.ico', 'image/x-icon'],
  ['.wasm', 'application/wasm']
]);

// Serve the actual project prefix so local checks catch broken Pages asset URLs.
createServer(async(request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname);
    if (!pathname.startsWith(basePath)) {
      response.writeHead(404).end('Not found');
      return;
    }

    const relativePath = pathname.slice(basePath.length);
    const filename = resolve(root, relativePath || 'index.html');
    if (!filename.startsWith(resolve(root) + sep)) {
      response.writeHead(404).end('Not found');
      return;
    }

    const content = await readFile(filename);
    response.writeHead(200, {
      'Content-Type': contentTypes.get(extname(filename)) ?? 'application/octet-stream',
      'Cache-Control': 'no-store'
    }).end(content);
  } catch {
    response.writeHead(404).end('Not found');
  }
}).listen(4173, '127.0.0.1', () => {
  console.log(`Preview: http://127.0.0.1:4173${basePath}`);
});
