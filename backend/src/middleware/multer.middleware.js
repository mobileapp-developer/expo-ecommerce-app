import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.test(path.mimetype(file.originalname).toLowerCase());

    if (extName && mimeType) {
        cb(null, true)
    } else {
        cb(new Error('Invalid file type'))
    }
}

export const upload = multer({
    storage,
    fileFilter,
    limits: {fileSize: 1024 * 1024 * 5}
})