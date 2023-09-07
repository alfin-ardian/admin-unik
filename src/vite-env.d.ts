/// <reference types="vite/client" />

export interface ImportMetaEnv {
  readonly VITE_KEY: string;
  readonly VITE_BASE_URL: string;
  readonly EDITOR_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
