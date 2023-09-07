import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import dotenv from "dotenv";

// Get the base directory dynamically
const basePath = path.resolve(__dirname);
dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": `${basePath}/src/assets`,
      "@components": `${basePath}/src/components`,
      "@router": `${basePath}/src/router`,
      "@hooks": `${basePath}/src/hooks`,
      "@utils": `${basePath}/src/utils`,
      types: `${basePath}/src/types`,
    },
  },
});
