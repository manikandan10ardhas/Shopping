var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());

//controllers
var shoppingController = require('./../Controllers/shoppingController');

//Routes
router.route('/Addproduct').get(shoppingController.addProduct);
router.route('/index').get(shoppingController.index);
router.route('/buyProduct/:productId').get(shoppingController.buyProduct);
router.route('/destroy').get(shoppingController.destroy);

router.route('/confirmOrder').post(shoppingController.confirmOrder);

module.exports = router;
