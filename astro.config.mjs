import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwind from '@tailwindcss/vite';

const remotePatterns = [
  { protocol: 'https', hostname: 'raw.githubusercontent.com', pathname: '/AnandChowdhary/**' },
];

export default defineConfig({
  site: 'https://anandchowdhary.com',
  output: 'server',
  devToolbar: { enabled: false },
  image: { remotePatterns },
  adapter: vercel({
    imageService: true,
    imagesConfig: {
      sizes: [384, 640, 828, 1080, 1280, 1920],
      formats: ['image/webp'],
      remotePatterns,
    },
    isr: { expiration: 60 },
    webAnalytics: { enabled: true },
  }),
  vite: {
    plugins: [tailwind()],
    // Vercel's Node loader rejects sanitize-html's CommonJS require() of its
    // ESM parser. Bundle this dependency graph instead of relying on require(ESM).
    ssr: { noExternal: [
      'sanitize-html', 'htmlparser2', 'domhandler', 'domutils', 'domelementtype',
      'dom-serializer', 'entities', 'escape-string-regexp', 'is-plain-object',
      'launder', 'dayjs', 'parse-srcset', 'postcss', 'nanoid', 'picocolors', 'source-map-js',
    ] },
  },
});
