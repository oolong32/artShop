var express = require('express');
var router = express.Router();

// Require controller modules
var index_controller = require('../controllers/indexController.js')
var things_controller = require('../controllers/thingsController.js')

/* GET home page. */
router.get('/', index_controller.index);

/* GET things page. */
router.get('/things', things_controller.things);

/* GET single thing page. */
router.get('/thing/:thing', things_controller.thing);

/* GET thing-create page. */
router.get('/new-thing', things_controller.thingCreateGet);

/* POST thing-create page. */
router.post('/new-thing', things_controller.thingCreatePost);

module.exports = router;
