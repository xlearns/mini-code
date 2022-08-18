import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "../packages/vite";
import Inspect from "vite-plugin-inspect";
export default defineConfig({
	plugins: [
		vue({
			reactivityTransform: true,
		}),
		Inspect(),
		AutoImport({
			url: "./components/",
		}),
	],
});
