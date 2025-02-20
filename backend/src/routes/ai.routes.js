const exprees = require('express');
const aiController = require('../controllers/ai.controller');
const router = exprees.Router()

router.post('/get-review', aiController.getResponse )


module.exports = router;