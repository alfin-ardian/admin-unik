import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";
import path from "path";

const basePath = path.resolve(__dirname);
dotenv.config();
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
      "@pages": `${basePath}/src/pages`,
      "@types": `${basePath}/src/types`,
      "@components": `${basePath}/src/components`,
    },
  },
  server: {
    host: "0.0.0.0",
  },
});
