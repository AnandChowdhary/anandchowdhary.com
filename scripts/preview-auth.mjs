// Optional preview authentication. Never forward the bypass credential to a
// different origin, including redirect destinations or third-party assets.
export function previewHeaders(url, initial) {
  const headers = new Headers(initial);
  headers.delete('x-vercel-protection-bypass');
  const origin = process.env.VERCEL_PREVIEW_ORIGIN;
  const secret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
  if (origin && secret && new URL(url).origin === new URL(origin).origin) {
    headers.set('x-vercel-protection-bypass', secret);
  }
  return headers;
}

export async function previewFetch(url, init = {}) {
  if (!['GET', 'HEAD'].includes((init.method || 'GET').toUpperCase())) throw new Error('Preview audit requests must be GET or HEAD');
  let current = new URL(url);
  for (let redirects = 0; ; redirects++) {
    const response = await fetch(current, { ...init, headers: previewHeaders(current, init.headers), redirect: 'manual' });
    const location = response.headers.get('location');
    if (init.redirect === 'manual' || ![301,302,303,307,308].includes(response.status) || !location) return response;
    if (init.redirect === 'error') throw new Error('Unexpected redirect');
    await response.body?.cancel();
    if (redirects >= 19) throw new Error('Too many redirects');
    current = new URL(location, current);
  }
}

export async function authorizeBrowser(browser, targetOrigin) {
  const origin = process.env.VERCEL_PREVIEW_ORIGIN;
  if (!origin || !process.env.VERCEL_AUTOMATION_BYPASS_SECRET) return false;
  if (targetOrigin && new URL(targetOrigin).origin !== new URL(origin).origin) return false;
  const response = await previewFetch(new URL('/', origin), {
    headers: { 'x-vercel-set-bypass-cookie': 'true' }, redirect: 'manual',
    signal: AbortSignal.timeout(30000),
  });
  const cookie = response.headers.getSetCookie().find(value => value.startsWith('_vercel_jwt='));
  await response.body?.cancel();
  if (!cookie) throw new Error('Vercel did not issue the protected-preview browser cookie');
  const pair = cookie.split(';')[0];
  await browser.defaultBrowserContext().setCookie({
    name: '_vercel_jwt', value: pair.slice(pair.indexOf('=') + 1),
    domain: new URL(origin).hostname, path: '/', secure: true, httpOnly: true,
  });
  return true;
}
