import { createUnplugin } from "unplugin";
import MagicString from "magic-string";
import { existSync } from "./fs";
import { resolve } from "path";
const test = /_component_(s*[^\/)]*)/g;
export default createUnplugin((options?: any) => {
	const { url } = options;
	return {
		name: "auto-import-unplugin",
		transformInclude(id) {
			return id.endsWith(".vue");
		},
		transform(code, id) {
			const s = new MagicString(code);
			let returned: any[] = [];
			s.replace(test, (c, val) => {
				if (c.includes("=")) return c;
				let [, , _str] = c.split("_");
				let str = _str.replace(/\s*/g, "");
				if (!returned.includes(_str)) {
					returned.push(str);
				} else {
					return c;
				}
				/**
				 * @description 判断文件是否存在存在就用当前目录得到文件路径，不存在就用url得到文件路径
				 */
				let im = `import ${str} from "${url}${str}.vue";`;
				let path = resolve(id, `../${str}.vue`);
				if (existSync(path)) {
					im = `import ${str} from "./${str}.vue";`;
				}
				if (str) s.prepend(im).append(";");
				return str ? `$setup["${str}"]` : c;
			});

			s.replace(/__returned__\s*=\s*{(.*)}/g, (_, $1, $2): any => {
				let res = [...returned, $1].join(",");
				return `__returned__ = {${res}}`;
			});
			return s.toString();
		},
	};
});
