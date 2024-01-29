import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA, ManifestOptions } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy(),
    VitePWA({
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "assets/*"],
      // generates 'manifest.webmanifest' file on build
      manifest: {
        name: "Cube J Empire",
        short_name: "CJE",
        theme_color: "#1976d2",
        background_color: "#fff",
        orientation: "portrait",
        scope: "/",
        start_url: ".",
        display: "standalone",
        icons: [
          {
            src: "images/icons/icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "images/icons/icon-96x96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "images/icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png",
          },
          {
            src: "images/icons/icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "images/icons/icon-152x152.png",
            sizes: "152x152",
            type: "image/png",
          },
          {
            src: "images/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "images/icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "images/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
});
