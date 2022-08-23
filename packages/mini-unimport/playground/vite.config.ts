import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import inspect from "vite-plugin-inspect";
import unimport from "../packages/unplugin";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		inspect(),
		unimport.vite({
			dts: true,
		}),
	],
});
