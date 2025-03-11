import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// import { componentTagger } from "lovable-tagger";
import react from "@vitejs/plugin-react"
import fs from "fs"
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: '0.0.0.0',  // Ensures accessibility inside Docker
    port: 7070,
    strictPort: true,
    https: {
      key: fs.readFileSync('./certs/key.pem'),  // Updated path
      cert: fs.readFileSync('./certs/cert.pem') // Updated path
    }
  },
  // plugins: [
  //   react(),
  //   mode === 'development' &&
  //   // componentTagger(),
  // ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
