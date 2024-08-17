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
router.patch('/:id/seats',
        FlightMiddlewares.validateUpdateSeatsRequest,
        FlightControllers.updateSeats
)        

module.exports = router;