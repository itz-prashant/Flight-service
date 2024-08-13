const { AirportService } = require('../services')

const {StatusCodes} = require('http-status-codes');
const {ErrorResponse, SucessResponse} = require('../utils/common')

async function createAirport(req, res) {
    try {
        const airport = await AirportService.createAirport({
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId
        })
        SucessResponse.data = airport
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

async function getAirports(req, res) {
    try {
        const airports = await AirportService.getAirports()
        SucessResponse.data = airports
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

async function getAirport(req, res) {
    try {
        const airport = await AirportService.getAirport(req.params.id)
        SucessResponse.data = airport
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

async function destroyAirport(req, res) {
    try {
        const airport = await AirportService.destroyAirport(req.params.id)
        SucessResponse.data = airport
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

async function updateAirport(req, res) {
    try {
        const airport = await AirportService.updateAirport(req.params.id,{
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId
        })
        SucessResponse.data = airport
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
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}