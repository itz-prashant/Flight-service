const express = require('express')
const { CityControllers } =require('../../controllers')
const { CityMiddlewares } = require('../../middlewares')
const router = express.Router()

router.post('/',
        CityMiddlewares.validateCreateRequest,
        CityControllers.createCity)

router.delete('/:id',
        CityControllers.destroyCity)

router.get('/',
        CityControllers.getCity)
        
module.exports = router;
