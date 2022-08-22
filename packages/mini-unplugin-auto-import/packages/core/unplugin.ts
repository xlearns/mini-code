import { createUnplugin } from "unplugin";
import MagicString from "magic-string";
import { existSync } from "./fs";
import { resolve } from "path";
import type { Options } from "./types";
import { createContext } from "./ctx";

const test = /_component_(s*[^\/)]*)/g;
export default createUnplugin((options: Options = {}) => {
	let ctx = createContext(options);
	const { url } = options;
	return {
		name: "auto-import-unplugin",
		transformInclude(id) {
			return id.endsWith(".vue");
		},
		transform(code, id) {
			return ctx.transform(code, id);
		},
	};
});
