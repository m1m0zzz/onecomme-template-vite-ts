import path from "path"

import { defineConfig } from "vite"


const TEMPLATE_NAME = "PROJECT_NAME"
const ONE_COMME_TEMPLATE_PATH = "AppData/Roaming/onecomme/templates/custom"
const DEV_OUT_DIR = path.resolve(process.env.HOME || process.env.USERPROFILE || ".", ONE_COMME_TEMPLATE_PATH, TEMPLATE_NAME)

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "./",
  plugins: [],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: mode === "export" ? "dist" : DEV_OUT_DIR,
    emptyOutDir: true,
  },
}))
