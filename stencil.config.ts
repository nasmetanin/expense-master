import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'www',
      // comment the following line to disable service workers in production
      serviceWorker: {
        globPatterns: [
          '**/*.{js,css,json,html,ico,png,jpg,jpeg}'
        ]
      },
      baseUrl: 'https://myapp.local/',
    },
  ],
};
