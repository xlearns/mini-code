declare global {
	interface typeAsset {
		id: number;
		filename: any;
		dependencies: any[];
		code: any;
		mapping?: unknown | null;
	}
}

export {};
