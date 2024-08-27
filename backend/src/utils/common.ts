import fs from 'fs'


export const parse = (el) => JSON.parse(JSON.stringify(el));

export const folderExistCheck = (path: string): boolean => {
	if (!fs.existsSync(path)) {
		fs.mkdirSync(path, { recursive: true });
	}
	return true;
};