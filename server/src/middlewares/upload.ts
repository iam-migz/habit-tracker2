import multer from 'multer';
import util from 'util';
import path from 'path';
import { APP_ROOT } from '../app';

const maxSize = 2 * 1024 * 1024; // 2mb

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, APP_ROOT + '/uploads/');
	},
	filename: (req, file, cb) => {
		// filename: userId + date.now
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({
	storage: storage,
	fileFilter: function (req, file, callback) {
		const ext = path.extname(file.originalname);
		if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
			return callback(new Error('Only images are allowed'));
		}
		callback(null, true);
	},
	limits: { fileSize: maxSize },
}).single('image');

const uploadMiddleware = util.promisify(upload);

export default uploadMiddleware;
