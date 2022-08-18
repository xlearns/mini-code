import fs from "fs";

export const exist = (path: string) =>
	fs.promises
		.access(path, fs.constants.F_OK)
		.then(() => true)
		.catch(() => false);

export const existSync = (path: string) => {
	try {
		fs.accessSync(path, fs.constants.F_OK);
		return true;
	} catch (error) {
		return false;
	}
};
