import type { Options } from "../types";
import { resolve } from "path";
import { createUnimport, type Import } from "unimport";
// @ts-expect-error types
import { vueTemplateAddon } from "unimport/addons";
import MagicString from "magic-string";
import { presets } from "../presets";
/**
 * @param options
 * @param root   获取playground跟目录
 */
export function createContext(options: Options = {}, root = process.cwd()) {
	const imports = flattenImports({
		vue: {},
	});
	const { injectImports } = createUnimport({
		imports: imports,
	});

	function generateDTS() {}

	async function transform(code: string, id: string) {
		const s = new MagicString(code);
		await injectImports(s, id);
		if (!s.hasChanged()) return;

		generateDTS();
		return {
			code: s.toString(),
			map: s.generateMap({ source: id, includeContent: true }),
		};
	}
	return {
		transform,
	};
}

/**
 * @param options
 * @returns
 */
export function flattenImports(options = {}): Import[] {
	let flat = {};
	for (let definition of Object.keys(options)) {
		if (typeof definition === "string") {
			if (!presets[definition])
				throw new Error(`[auto-import] preset ${definition} not found`);
			const preset = presets[definition];
			definition = typeof preset === "function" ? preset() : preset;
			for (const mod of Object.keys(definition)) {
				for (const id of definition[mod]) {
					const meta = {
						from: mod,
					} as Import;
					let name: string;
					if (Array.isArray(id)) {
						name = id[1];
						meta.name = id[0];
						meta.as = id[1];
					} else {
						name = id;
						meta.name = id;
						meta.as = id;
					}

					if (flat[name])
						throw new Error(
							`[auto-import] identifier ${name} already defined with ${flat[name].from}`
						);

					flat[name] = meta;
				}
			}
		}
	}
	return Object.values(flat);
}
