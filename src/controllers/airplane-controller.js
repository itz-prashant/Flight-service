const { AirplaneService } = require('../services')

const {StatusCodes} = require('http-status-codes');

async function createAirplane(req, res) {
    try {
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        })
        return res.status(StatusCodes.CREATED).json({
            sucess: true,
            message: "Sucessfully create airplane",
            data: airplane,
            error: {}
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            sucess: false,
            message: "Something went wrong while creating",
            data: {},
            error: {}
        })
    }
}

module.exports ={
    createAirplane
}