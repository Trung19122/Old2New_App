const express              = require('express');
const router               = express.Router();
const ctrl                 = require('../controllers/productController');
const { requireLogin }     = require('../middleware/auth');
const upload               = require('../middleware/upload');

router.get('/',         ctrl.index);
router.get('/create',   requireLogin, ctrl.getCreate);
router.post('/create',  requireLogin, upload.single('image'), ctrl.postCreate);
router.get('/:id',      ctrl.show);

module.exports = router;