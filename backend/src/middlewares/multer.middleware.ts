import { folderExistCheck } from '@/utils/common';
import { Request } from 'express';
import multer, { diskStorage } from 'multer';
import { extname } from 'path';

const storage = (foldername: string) =>
    diskStorage({
        destination: (_req, _file, cb) => {
            console.log("Desc....")
            folderExistCheck(foldername);
            cb(null, foldername);
        },
        filename: (_req: Request, file, cb) => {
            const file_name = file.originalname + '_' + Date.now() + extname(file.originalname);
            console.log("FileName: ", file_name)
            _req.body.image_url = `/${foldername}/${file_name}`;
            return cb(null, file_name);
        },
    });


export const multerInterceptorConfig = (
    foldername: string = 'uploads',
) => {
    console.log('Hello', foldername)
    // const upload = multer({ dest: 'uploads/' })
    const upload = multer({
		storage: storage(foldername),
	});

    return upload;
}