import { renderToReadableStream } from 'react-dom/server';
import type { ReactNode } from 'react';
import { RouteResponse } from './navigation';
import { metadata as defaults } from './site-metadata';
import type { Metadata } from './metadata';
import { withSourceContext } from './source';
import { notFoundHtml } from './not-found';

type Props<P> = { params: Promise<P> };
type PageModule<P> = {
  default: (props: Props<P>) => ReactNode | Promise<ReactNode>;
  metadata?: Metadata;
  generateMetadata?: (props: Props<P>) => Promise<Metadata>;
};

export async function renderPage<P extends Record<string, string>>(page: PageModule<P>, params: Record<string, string | undefined>) {
  return withSourceContext(async () => {
    try {
      const props = { params: Promise.resolve(params as P) };
      const own = page.generateMetadata ? await page.generateMetadata(props) : page.metadata || {};
      const metadata = { ...defaults, ...own };
      let renderError: unknown;
      // Async JSX sections are resolved on the server. No RSC payload or browser hydration is emitted.
      const stream = await renderToReadableStream(await page.default(props), {
        onError(error) { renderError = error; },
      });
      await stream.allReady;
      if (renderError) throw renderError;
      return { status: 200, metadata, html: await new Response(stream).text(), location: undefined };
    } catch (error) {
      if (error instanceof RouteResponse) {
        return { status: error.status, location: error.location, metadata: { ...defaults, title: '404: This page could not be found.', robots: 'noindex' }, html: notFoundHtml };
      }
      if (process.env.SITE_STATIC_BUILD === '1') throw error;
      console.error('Page rendering failed', error);
      return { status: 503, location: undefined, metadata: { ...defaults, title: 'Temporarily unavailable / Anand Chowdhary' }, html: '<main class="p-8 sm:p-20 font-sans"><h1>Temporarily unavailable</h1><p>Please try again shortly.</p></main>' };
    }
  });
}
