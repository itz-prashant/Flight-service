const { StatusCodes } = require('http-status-codes')
const { ErrorResponse } = require('../utils/common')
const AppError = require('../utils/errors/app-error')

function validateCreateRequest(req,res,next){
    if(!req.body.flightNumber){
        ErrorResponse.message = "Something went wrong while creating flight",
        
        ErrorResponse.error  = new AppError(["Flight number not found incoming request"], StatusCodes.BAD_REQUEST)
        
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
    }
    if(!req.body.airplaneId){
        ErrorResponse.message = "Something went wrong while creating flight",
        
        ErrorResponse.error  = new AppError(["Airplane id not found incoming request"], StatusCodes.BAD_REQUEST)
        
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
    }
    if(!req.body.departureAirportId){
        ErrorResponse.message = "Something went wrong while creating flight",
        
        ErrorResponse.error  = new AppError(["departure airport Id not found incoming request"], StatusCodes.BAD_REQUEST)
        
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
    }
    if(!req.body.arrivalAirportId){
        ErrorResponse.message = "Something went wrong while creating flight",
        
        ErrorResponse.error  = new AppError(["arrival airport Id not found incoming request"], StatusCodes.BAD_REQUEST)
        
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
    }
    if(!req.body.arrivalTime){
        ErrorResponse.message = "Something went wrong while creating flight",
        
        ErrorResponse.error  = new AppError(["arrival time  not found incoming request"], StatusCodes.BAD_REQUEST)
        
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
    }
    if(!req.body.departureTime){
        ErrorResponse.message = "Something went wrong while creating flight",
        
        ErrorResponse.error  = new AppError(["departure time not found incoming request"], StatusCodes.BAD_REQUEST)
        
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
    }
    if(!req.body.price){
        ErrorResponse.message = "Something went wrong while creating flight",
        
        ErrorResponse.error  = new AppError(["price not found incoming request"], StatusCodes.BAD_REQUEST)
        
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
    }
    if(!req.body.totalSeats){
        ErrorResponse.message = "Something went wrong while creating flight",
        
        ErrorResponse.error  = new AppError(["total Seats not found incoming request"], StatusCodes.BAD_REQUEST)
        
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
    }
    next()
}

function validateUpdateSeatsRequest(req,res,next){
    if(!req.body.seats){
        ErrorResponse.message = "Something went wrong while update flight",
        
        ErrorResponse.error  = new AppError(["Seats not found incoming request"], StatusCodes.BAD_REQUEST)
        
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
    }
    next()
}

module.exports = {
    validateCreateRequest,
    validateUpdateSeatsRequest
}