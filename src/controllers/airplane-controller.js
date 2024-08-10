const { AirplaneService } = require('../services')

const {StatusCodes} = require('http-status-codes');
const {ErrorResponse, SucessResponse} = require('../utils/common')

async function createAirplane(req, res) {
    try {
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        })
        SucessResponse.data = airplane
        return res
                .status(StatusCodes.CREATED)
                .json(SucessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
    }
}

async function getAirplanes(req, res) {
    try {
        const airplanes = await AirplaneService.getAirplanes()
        SucessResponse.data = airplanes
        return res
                .status(StatusCodes.OK)
                .json(SucessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
    }
}

module.exports ={
    createAirplane,
    getAirplanes
}