// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://hieutt2904.github.io',
  base: '/foodvn',
  trailingSlash: 'ignore',
  vite: {
    plugins: [tailwindcss()],
  },
});
