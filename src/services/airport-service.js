const { StatusCodes } = require('http-status-codes');
const { AirportRepository } = require('../repositories')
const AppError = require('../utils/errors/app-error')
const airportRepository = new AirportRepository();

async function createAirport(data) {
    try {
        const airport = await airportRepository.create(data)
        return airport
    } catch (error) {
        console.log(error);
        
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach((err)=>{
                explanation.push(err.message)
            })
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Can not create new airport', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAirports() {
    try {
        const airport = await airportRepository.getAll()
        return airport;
    } catch (error) {
        throw new AppError('Can not fetch data of all the airport', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAirport(id) {
    try {
        const airport = await airportRepository.get(id)
        return airport;
    } catch (error) { 
       if(error.statusCode = StatusCodes.NOT_FOUND){
            throw new AppError('The airport you requested is not present', error.statusCode)
       }
    }
    throw new AppError('Can not fetch data of the airport', StatusCodes.INTERNAL_SERVER_ERROR)
}

async function destroyAirport(id) {
    try {
        const airport = await airportRepository.destroy(id)
        return airport;
    } catch (error) {
        if(error.statusCode = StatusCodes.NOT_FOUND){
            throw new AppError('The airport you requested to delete is not present', error.statusCode)
       }
        throw new AppError('Can delete data of the airport', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function updateAirport(id, data ) {
    try {
        const airport = await airportRepository.update(id, data)
        return airport;
    } catch (error) {
        if(error.statusCode = StatusCodes.NOT_FOUND){
            throw new AppError('The airport you requested to update is not present', error.statusCode)
       }
        throw new AppError('Can not Update', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}