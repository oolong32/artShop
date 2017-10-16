const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mime = require('mime/lite');

// Multer (file upload)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads'))
  },
  filename: function (req, file, cb) {
    // Dateiname, Endung für Bildupload
    cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype))
  }
})
const upload = multer({
  storage: storage,
  limits: {fileSize: 2000000},
  fileFilter: function(req, file, cb) {
    let filetypes = /jpeg|jpg|png|gif/;
    let mime_type = mime.extension(file.mimetype);
    // var mime_type = filetypes.test(file.mimetype);
    let extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mime_type && extname) {
      return cb(null, true);
    }
    cb('Error: Es werden nur folgende Dateitypen akzeptiert: ' + filetypes)
  }
});

// Require controller modules
const index_controller = require('../controllers/indexController.js')
const things_controller = require('../controllers/thingsController.js')

/* GET home page. */
router.get('/', index_controller.index);

/* GET things page. */
router.get('/things', things_controller.things);

/* GET single thing page. */
router.get('/thing/:thing', things_controller.thing);

/* GET thing-create page. */
router.get('/new-thing', upload.single('image'), things_controller.thingCreateGet);

/* POST thing-create page. */
router.post('/new-thing', things_controller.thingCreatePost);

module.exports = router;
