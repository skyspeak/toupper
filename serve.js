/* Zero-dependency local server: `node serve.js [port]`.
   Serves the static site and runs the /api functions the same way Vercel
   does, so lead capture can be tested locally. */
const http = require('http'), fs = require('fs'), path = require('path');
const root = __dirname, port = Number(process.argv[2] || 4321);
const TYPES = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8',
  '.js':'text/javascript; charset=utf-8', '.json':'application/json', '.svg':'image/svg+xml' };

/* Minimal shim for the res.status().json() shape the handlers expect. */
function decorate(res) {
  res.status = (code) => { res.statusCode = code; return res; };
  res.json = (obj) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(obj));
    return res;
  };
  return res;
}

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  let p = decodeURIComponent(url.pathname);

  if (p.startsWith('/api/')) {
    const fn = path.join(root, 'api', path.basename(p) + '.js');
    if (!fs.existsSync(fn)) { res.writeHead(404).end('no such function'); return; }
    try {
      delete require.cache[require.resolve(fn)];   // pick up edits without a restart
      await require(fn)(req, decorate(res));
    } catch (err) {
      console.error(err);
      if (!res.headersSent) decorate(res).status(500).json({ ok: false, error: 'handler_threw' });
    }
    return;
  }

  if (p.endsWith('/')) p += 'index.html';
  const file = path.join(root, path.normalize(p).replace(/^(\.\.[\/\\])+/, ''));
  if (!file.startsWith(root)) { res.writeHead(403).end('forbidden'); return; }
  fs.readFile(file, (err, buf) => {
    if (err) { res.writeHead(404, { 'Content-Type': 'text/html' }).end('<h1>404</h1>'); return; }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
    res.end(buf);
  });
}).listen(port, () => console.log('ToUpper running at http://localhost:' + port));
