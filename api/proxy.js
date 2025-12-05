export default async function handler(req, res) {
  const url = new URL(req.url, `https://${req.headers.host}`);
  url.hostname = 'api.telegram.org';
  const response = await fetch(url.toString(), {
    method: req.method,
    headers: { Host: 'api.telegram.org', ...req.headers },
    body: req.method !== 'GET' ? req.body : undefined,
  });
  const data = await response.text();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(response.status).send(data);
}
