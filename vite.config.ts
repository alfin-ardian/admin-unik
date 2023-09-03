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
      "@hooks": `${basePath}/src/hooks`,
      "@helper": `${basePath}/src/helper`,
      "@assets": `${basePath}/src/assets`,
      "@router": `${basePath}/src/router`,
      "@context": `${basePath}/src/context`,
      types: `${basePath}/src/types`,
      "@components": `${basePath}/src/components`,
    },
  },
});
