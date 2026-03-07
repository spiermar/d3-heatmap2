import { defineConfig } from "vite"
import { resolve } from "path"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root: "src",
  publicDir: "../public",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    copyPublicDir: false,
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, "lib/heatmap.js"),
      name: "heatmap",
      formats: ["umd", "es"],
      fileName: (format) => `d3-heatmap2.${format}.js`,
    },
    rollupOptions: {
      external: [
        "d3-array",
        "d3-axis",
        "d3-fetch",
        "d3-format",
        "d3-scale",
        "d3-selection",
      ],
      output: {
        format: "umd",
        exports: "named",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith(".css")) {
            return "d3-heatmap2.css"
          }
          return assetInfo.name
        },
        globals: {
          "d3-array": "d3",
          "d3-axis": "d3",
          "d3-fetch": "d3",
          "d3-format": "d3",
          "d3-scale": "d3",
          "d3-selection": "d3",
        },
      },
    },
    minify: false,
  },
  plugins: [],
  server: {
    port: 3000,
    open: false,
  },
})