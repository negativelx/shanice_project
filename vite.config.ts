import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import vueI18n from "@intlify/unplugin-vue-i18n";
import * as glob from "glob";

/** @type {import("vite").UserConfig} */
export default defineConfig({
  root: process.cwd(),
  plugins: [
    vue(),
    VitePWA({
      filename: "sw.ts",
      includeAssets: ["*.svg,*.png,*.css,*.scss,*.sass,*.pdf"],
      includeManifestIcons: false,
      minify: true,
      outDir: "dist",
      srcDir: "src",
      strategies: "injectManifest",
      injectRegister: "inline",
      registerType: "autoUpdate",
      workbox: {
        sourcemap: true,
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        inlineWorkboxRuntime: true,
        maximumFileSizeToCacheInBytes: 10000000,
        additionalManifestEntries: [
          ...glob.sync("dist/**/*.js").map((path) => ({
            url: path.replace("dist", ""),
            revision: `${Date.now().toString()}.${(Math.random()).toString(36).substring(2)}`
          }))
        ],
        runtimeCaching: [
          {
            // Static File:  Cache First 策略
            urlPattern: ({ url }) => {
              return url.origin === self.location.origin &&
                  /\.(css|png|jpg|jpeg|svg|gif|ico|woff|woff2|ttf)$/i.test(url.pathname);
            },
            handler: "CacheFirst",
            options: {
              cacheName: "static-internal-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          }, {
            // Static File:  Stale While Revalidate 策略
            urlPattern: ({ url }) => {
              return url.origin !== self.location.origin &&
                  /\.(js|css|png|jpg|jpeg|svg|gif|ico|woff|woff2|ttf)$/i.test(url.pathname);
            },
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "static-external-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          },
          {
            //Html/htm: Network First 策略
            urlPattern: /\.(?:html|htm)$/,
            handler: "NetworkFirst",
            options: {
              cacheName: "site-cache",
              networkTimeoutSeconds: 10, // 可自定义，在此时间后如果没有从网络获取到资源，将尝试从缓存获取
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 3600 // 7 days
              }
            }
          },
          {
            // Other requests: NetworkOnly 策略
            urlPattern: /^https?.*/,
            handler: "NetworkOnly",
            options: {
              backgroundSync: {
                name: "networkQueue",
                options: {
                  maxRetentionTime: 60
                }
              }
            }
          }
        ]
      },
      useCredentials: true,
      injectManifest: {
        maximumFileSizeToCacheInBytes: 10000000,
        swSrc: "src/sw.ts", // 指定自定义服务工作者文件的路径
        swDest: "dist/sw.js" // 指定输出服务工作者文件的路径
      },
      manifest: {
        id: "/",
        start_url: "./index.html?source=pwa",
        name: "Project CSL",
        short_name: "Project CSL",
        description: "Project CSL",
        background_color: "#3BB34A",
        theme_color: "#3BB34A",
        display: "fullscreen",
        orientation: "portrait-primary",
        scope: "/",
        icons: [
          {
            src: "https://cdn.wellous.com/membership/assets/wellous/images/icon-48x48.png",
            sizes: "48x48",
            type: "image/png"
          },
          {
            src: "https://cdn.wellous.com/membership/assets/wellous/images/icon-72x72.png",
            sizes: "72x72",
            type: "image/png"
          },
          {
            src: "https://cdn.wellous.com/membership/assets/wellous/images/icon-96x96.png",
            sizes: "96x96",
            type: "image/png"
          },
          {
            src: "https://cdn.wellous.com/membership/assets/wellous/images/icon-128x128.png",
            sizes: "128x128",
            type: "image/png"
          },
          {
            src: "https://cdn.wellous.com/membership/assets/wellous/images/icon-144x144.png",
            sizes: "144x144",
            type: "image/png"
          },
          {
            src: "https://cdn.wellous.com/membership/assets/wellous/images/icon-152x152.png",
            sizes: "152x152",
            type: "image/png"
          },
          {
            src: "https://cdn.wellous.com/membership/assets/wellous/images/icon-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "https://cdn.wellous.com/membership/assets/wellous/images/icon-256x256.png",
            sizes: "256x256",
            type: "image/png"
          },
          {
            src: "https://cdn.wellous.com/membership/assets/wellous/images/icon-384x384.png",
            sizes: "384x384",
            type: "image/png"
          },
          {
            src: "https://cdn.wellous.com/membership/assets/wellous/images/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "https://cdn.wellous.com/membership/assets/wellous/images/icon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "maskable"
          }
        ]
      }
    }),
    vueI18n.vite({
      include: [path.resolve("./src/locales/**")]
    })
  ],
  resolve: {
    alias: [
      {
        find: /\/#\//,
        replacement: path.resolve("types")
      },
      {
        find: "@",
        replacement: path.resolve("src")
      }
    ],
    dedupe: ["vue"]
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/assets/sass/layout.scss";`
      }
    }
  },
  build: {
    target: "es2015",
    reportCompressedSize: true,
    assetsInlineLimit: 10000,
    chunkSizeWarningLimit: 2000
  }
});
