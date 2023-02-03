var express = require('express');
var router = express.Router();
var {Acer} = require('../src/entity/acer');
var {UserCar} = require('../src/entity/userCar');
var {getManager} = require( "typeorm");

/* GET home page. */
router.get('/', async function(req, res, next) {
	const cookie = req.cookies;//获取cookie值
	console.log('cookie', cookie);
	const userselect = getManager().getRepository(Acer);
	const userdata = await userselect.findOne({where:{session:cookie.account}});
	// console.log('userdata', userdata);
	const repository = getManager().getRepository(UserCar);
	const rawData = await repository.find({where:{Carid:userdata.userNum}});
	// console.log('rawData', rawData);
	// console.log('userdata', userdata);
		res.render('car', {
			rawData:rawData
		});
});

router.post('/', async function(req, res, next) {
	const cookie = req.cookies;//获取cookie值
	// console.log('cookie', cookie);
	const {quantity} = req.body;
	// console.log('quantity',req.body);
	for(var i=0;i < quantity.length;i++){
		const userselect = getManager().getRepository(Acer);
		const userdata = await userselect.findOne({where:{session:cookie.account}});
		// console.log('userdata',userdata.userNum);
		const pository = getManager().getRepository(UserCar);
		const rawData = await pository.find({where:{Carid:userdata.userNum}});
		let newcar = new UserCar();
		newcar.quantity = quantity;
		// console.log('UserCar',newcar);
		await pository.update(rawData[i],{quantity:newcar.quantity[i]});
		console.log('raData',rawData[i]);
	}
});

module.exports = router;