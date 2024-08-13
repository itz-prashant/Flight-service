const express = require('express')
const { AirportControllers } =require('../../controllers')
const { AirportMiddlewares } =require('../../middlewares')

const router = express.Router()

router.post('/',
        AirportMiddlewares.validateCreateRequest, 
        AirportControllers.createAirport)

router.get('/',
        AirportControllers.getAirports)

router.get('/:id',
        AirportControllers.getAirport)

router.delete('/:id',
        AirportControllers.destroyAirport)
        

router.patch('/:id',
        AirportControllers.updateAirport)

module.exports = router;