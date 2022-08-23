import { createUnplugin, type UnpluginOptions } from "unplugin";
import { promises as fs } from "fs";
import type { unpluginOptions } from "./types";

export default createUnplugin<unpluginOptions>(
	(options = {}): UnpluginOptions => {
		const dts = options.dts === true ? "unimport.d.ts" : options.dts;
		return {
			name: "unimport",
			enforce: "post",
			async transform(code, id) {
				return code;
			},
			async buildStart() {
				//生成dts
				if (dts) {
					return fs.writeFile(dts, "hello world", "utf-8");
				}
			},
		};
	}
);
