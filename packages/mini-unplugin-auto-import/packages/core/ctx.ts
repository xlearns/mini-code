import type { Options } from "./types";
/**
 * @param options
 * @param root   获取playground跟目录
 */
export const createContext = (options: Options = {}, root = process.cwd()) => {
	async function transform(code: string, id: string) {
		console.log(code);
		return code;
	}
	return {
		transform,
	};
};
