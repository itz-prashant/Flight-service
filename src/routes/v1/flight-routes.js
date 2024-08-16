const express = require('express')
const { FlightControllers } =require('../../controllers')
const { FlightMiddlewares } =require('../../middlewares')

const router = express.Router()

router.post('/',
        FlightMiddlewares.validateCreateRequest, 
        FlightControllers.createFlight)

router.get('/',
        FlightControllers.getAllFlights
)        
router.get('/:id',
        FlightControllers.getFlight
)        

module.exports = router;