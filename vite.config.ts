import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",  // Allows external access
    port: 8080,
    proxy: {
      "/api": {
        target: "http://139.5.189.24:8909",  
        changeOrigin: true,
        secure: false, // Allow HTTP
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
