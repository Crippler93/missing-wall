const multer = require('multer');

const ACCEPTED_MIMETYPE = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, '/temp');
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

function fileFilter(req, file, cb) {
  if (ACCEPTED_MIMETYPE.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

module.exports = multer({ fileFilter, storage });
