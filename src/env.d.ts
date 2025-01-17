/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_API_HOST: string
	readonly VITE_WITH_SERVER: "0" | "1"
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
