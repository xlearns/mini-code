type ImportNameAlias = [string | string];
export type ImportsMap = Record<string, (string | ImportNameAlias)[]>;
export interface Options {
	url?: string;
}
