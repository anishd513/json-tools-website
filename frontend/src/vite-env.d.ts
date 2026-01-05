/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADSENSE_CLIENT_ID: string
  readonly VITE_GA_MEASUREMENT_ID: string
  readonly VITE_SITE_URL: string
  readonly VITE_SITE_NAME: string
  readonly VITE_CONTACT_EMAIL: string
  readonly VITE_PRIVACY_EMAIL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}











