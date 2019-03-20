var express        = require('express');
var router         = express.Router();
let visitCtrl       = require('../../controllers/visit')
router.route('/create/visit').post(visitCtrl.createVisit)
module.exports=router