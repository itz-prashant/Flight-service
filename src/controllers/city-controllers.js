const { CityService} = require('../services')

const {StatusCodes} = require('http-status-codes');
const {ErrorResponse, SucessResponse} = require('../utils/common')

async function createCity(req, res) {
    try {
        const city = await CityService.createCity({
            name: req.body.name
        })
        SucessResponse.data = city
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

module.exports = {
    createCity
}