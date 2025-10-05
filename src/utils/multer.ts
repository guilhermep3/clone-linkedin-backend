import multer from "multer";

const diskStorage = multer.diskStorage({
  filename(req, file, callback) {
    const prefix = 'img-' + Math.floor(Math.random() * 9999);
    callback(null, prefix + '.jpg')
  },
  destination(req, file, callback) {
    callback(null, './public/images/temp')
  },
})

const memoryStorage = multer.memoryStorage();

export const upload = multer({
  storage: memoryStorage
})