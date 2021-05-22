const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

// MULTER PLACED AFTER AUTH NOT TO HAVE
// UNAUTHENTICATED USERS BEING ABLE TO UPLOAD
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/stuff');

router.get('/', auth, stuffCtrl.getAllStuff);
router.post('/', auth, multer, stuffCtrl.createThing);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.put('/:id', auth, multer, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);

module.exports = router;