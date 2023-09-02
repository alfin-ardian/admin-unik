import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Get the base directory dynamically
const basePath = path.resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@hooks": "./src/hooks",
      "@helper": "./src/helper",
      "@assets": "./src/assets",
      "@router": "./src/router",
      "@context": "./src/context",
      "@pages": "./src/pages",
      "@types": "./src/types",
      "@components": "./src/components",
    },
  },
});
