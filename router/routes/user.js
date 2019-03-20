var express        = require('express');
var router         = express.Router();
let userCtrl       = require('../../controllers/user')
let security       = require('../../auth.js')
let Roles          = require('../../systemArchi/roles')

router.route('/create/user').post(security.secure(['admin']),userCtrl.register)
router.route('/create/admin').post(security.secure(['admin']),userCtrl.registerStaff(Roles.roles.admin.name))
router.route('/create/supervisor').post(security.secure(['admin']),userCtrl.registerStaff(Roles.roles.supervisor.name))
router.route('/access/user').post(userCtrl.access)
module.exports=router