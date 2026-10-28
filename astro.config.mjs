import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://anandchowdhary.com',
  base: process.env.PAGES_BASE_PATH || '/',
  output: 'static',
  trailingSlash: 'ignore',
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwind()],
    ssr: { noExternal: ['sanitize-html', 'htmlparser2', 'domhandler', 'domutils',
      'domelementtype', 'dom-serializer', 'entities', 'escape-string-regexp',
      'is-plain-object', 'launder', 'dayjs', 'parse-srcset', 'postcss', 'nanoid',
      'picocolors', 'source-map-js'] },
  },
});
