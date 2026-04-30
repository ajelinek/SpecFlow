// @ts-check
import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid-js';
import starlight from '@astrojs/starlight';
import { starlightSidebar, siteMeta } from './src/lib/specflow.ts';

export default defineConfig({
  site: 'https://ajelinek.github.io',
  base: '/SpecFlow',
  integrations: [
    solid(),
    starlight({
      title: siteMeta.title,
      description: siteMeta.description,
      logo: {
        src: './public/favicon.svg',
        alt: 'SpecFlow',
      },
      social: [
        { icon: 'github', label: 'GitHub', href: siteMeta.github },
      ],
      sidebar: starlightSidebar,
      customCss: ['./src/styles/global.css'],
      components: {
        Banner: './src/components/StarlightBanner.astro',
      },
      // Suppress Starlight's injected /404 route; our custom src/pages/404.astro owns it
      disable404Route: true,
    }),
  ],
});
