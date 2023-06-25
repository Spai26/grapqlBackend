import { Request } from 'express';
import { existsSync, mkdirSync } from 'fs';
import multer, { FileFilterCallback } from 'multer';
import path, { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

//verifico si existe la carpeta para crearlo
let url = join(__dirname, '../uploads/');
const storage = multer.diskStorage({
  destination: '../uploads/',
  filename: function (req, file, cb) {
    const filename = `${uuidv4()}${path.extname(file.originalname)}
`;
    cb(null, filename);
  }
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('El archivo no es una imagen válida.'));
  }
};

export const upload = multer({ storage, fileFilter }).single('file');
export const arrayUpload = multer({ storage, fileFilter }).array('gallery', 10);
