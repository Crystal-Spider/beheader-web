import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {createServer} from 'node:http';
import {extname, resolve, sep} from 'node:path';

/** Test-only deployment switch; the visible application version stays unchanged. */
interface UpdateServer {
  readonly url: string;
  publish(): void;
  close(): Promise<void>;
}

/** Manifest fields patched for the second build; other generated fields are retained. */
interface Manifest {hashTable: Record<string, string>}

/**
 * Serve two valid builds on an isolated origin without modifying shared production files.
 * @returns {Promise<UpdateServer>} Local server with an atomic deployment switch.
 */
export async function startUpdateServer(): Promise<UpdateServer> {
  const root = resolve('docs');
  const prefix = '/beheader-web/';
  const originalIndex = readFileSync(resolve(root, 'index.html'));
  const nextIndex = Buffer.from(originalIndex.toString('utf8').replace('<head>', '<head><meta name="bhw-fixture-build" content="next">'));
  const manifest = JSON.parse(readFileSync(resolve(root, 'ngsw.json'), 'utf8')) as Manifest;
  const nextManifest = {...manifest, appData: {revision: 'next'}, hashTable: {...manifest.hashTable, [`${prefix}index.html`]: createHash('sha1').update(nextIndex).digest('hex')}};
  const types: Record<string, string> = {'.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json'};
  let published = false;
  const server = createServer((request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname);
      if (!pathname.startsWith(prefix)) { response.writeHead(404).end(); return; }
      const filename = resolve(root, pathname.slice(prefix.length) || 'index.html');
      if (!filename.startsWith(root + sep)) { response.writeHead(404).end(); return; }
      const content = pathname === `${prefix}ngsw.json` ? JSON.stringify(published ? nextManifest : manifest)
        : filename === resolve(root, 'index.html') ? (published ? nextIndex : originalIndex) : readFileSync(filename);
      response.writeHead(200, {'Content-Type': types[extname(filename)] ?? 'application/octet-stream', 'Cache-Control': 'no-store'}).end(content);
    } catch { response.writeHead(404).end(); }
  });
  await new Promise<void>((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
  const address = server.address();
  if (!address || typeof address === 'string') { throw new Error('Missing update-fixture port'); }
  return {
    url: `http://127.0.0.1:${address.port}${prefix}`,
    publish: () => { published = true; },
    close: async() => {
      server.closeAllConnections();
      await new Promise<void>((resolve, reject) => server.close(error => { if (error) { reject(error); } else { resolve(); } }));
    }
  };
}
