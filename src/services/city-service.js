const { StatusCodes } = require('http-status-codes');
const { CityRepository } = require('../repositories')
const AppError = require('../utils/errors/app-error')
const cityRepository = new CityRepository()

async function createCity(data) {
    try {
        const city = await cityRepository.create(data)
        return city
    } catch (error) {    
        if(error.name == 'SequelizeValidationError' || error.name =='SequelizeUniqueConstraintError'){
            let explanation = [];
            error.errors.forEach((err)=>{
                explanation.push(err.message)
            })
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Can not create new city object', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function destroyCity(id) {
    try {
        const city = await cityRepository.destroy(id)
        return city;
    } catch (error) {
        if(error.statusCode = StatusCodes.NOT_FOUND){
            throw new AppError('The city you requested to delete is not present', error.statusCode)
       }
        throw new AppError('Can not fetch data of all the city', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getCity() {
    try {
        const city = await cityRepository.getAll()
        return city;
    } catch (error) {
        throw new AppError('Can not fetch data of all the city', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function updateCity(id, data ) {
    try {
        const city = await cityRepository.update(id, data)
        return city;
    } catch (error) {
        if(error.statusCode = StatusCodes.NOT_FOUND){
            throw new AppError('The city you requested to update is not present', error.statusCode)
       }
        throw new AppError('Can not Update', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    createCity,
    destroyCity,
    getCity,
    updateCity
}
