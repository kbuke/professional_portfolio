import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // everything starting with /api goes to Flask
      "/api": {
        target: "http://127.0.0.1:5555",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ""), // strip `/api` before forwarding
      },
    },
  },
})


