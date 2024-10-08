const { StatusCodes } = require('http-status-codes');
const { AirplaneRepository } = require('../repositories')
const AppError = require('../utils/errors/app-error')
const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
    try {
        const airplane = await airplaneRepository.create(data)
        return airplane
    } catch (error) {
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach((err)=>{
                explanation.push(err.message)
            })
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Can not create new airplane', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAirplanes() {
    try {
        const airplanes = await airplaneRepository.getAll()
        return airplanes;
    } catch (error) {
        throw new AppError('Can not fetch data of all the airplanes', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAirplane(id) {
    try {
        const airplane = await airplaneRepository.get(id)
        return airplane;
    } catch (error) { 
       if(error.statusCode = StatusCodes.NOT_FOUND){
            throw new AppError('The airplane you requested is not present', error.statusCode)
       }
    }
    throw new AppError('Can not fetch data of all the airplanes', StatusCodes.INTERNAL_SERVER_ERROR)
}

async function destroyAirplane(id) {
    try {
        const airplanes = await airplaneRepository.destroy(id)
        return airplanes;
    } catch (error) {
        if(error.statusCode = StatusCodes.NOT_FOUND){
            throw new AppError('The airplane you requested to delete is not present', error.statusCode)
       }
        throw new AppError('Can not fetch data of all the airplanes', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function updateAirplane(id, data ) {
    try {
        const airplanes = await airplaneRepository.update(id, data)
        return airplanes;
    } catch (error) {
        if(error.statusCode = StatusCodes.NOT_FOUND){
            throw new AppError('The airplane you requested to update is not present', error.statusCode)
       }
        throw new AppError('Can not Update', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}