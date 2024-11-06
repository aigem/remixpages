import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), remixCloudflareDevProxy(),
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
  ],
  optimizeDeps: {
    include: ['@mdx-js/react'],
  },
  server: {
    fs: {
      strict: false,
    },
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 8002,
      timeout: 5000,
      overlay: true,
    },
  },
  esbuild: {
    charset: 'utf8',
  },
})
