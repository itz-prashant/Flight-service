const { StatusCodes } = require('http-status-codes');
const { FlightRepository } = require('../repositories')
const AppError = require('../utils/errors/app-error');
const { Op } = require('sequelize');
const flightRepository = new FlightRepository();

async function createFlight(data) {
    try {
        const flight = await flightRepository.create(data)
        return flight
    } catch (error) {
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach((err)=>{
                explanation.push(err.message)
            })
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Can not create new flight', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAllFlights(query) {
    let customFilter = {}
    let sortFilter = []
    const endingTripTime = "23:59:00"
    if(query.trips){
        [departureAirportId, arrivalAirportId] = query.trips.split("-");
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId= arrivalAirportId;
    }
    if(query.price){
        [minPrice, maxPrice] = query.price.split("-")
        customFilter.price = {
            [Op.between]: [minPrice, ((maxPrice == undefined) ? 2000 : maxPrice)]
        }
    }
    if(query.travellers){
        customFilter.totalSeats = {
            [Op.gte]: query.travellers
        }
    }
    if(query.tripDate){
        customFilter.departureTime = {
            [Op.between]: [query.tripDate, query.tripDate + endingTripTime]
        }
    }
    if(query.sort){
        const params = query.sort.split(",")
        const sortFilters = params.map((param)=> param.split('_'));
        sortFilter = sortFilters
    }
    try {
        const flight = await flightRepository.getAllFlights(customFilter, sortFilter)
        return flight
    } catch (error) {
        console.log(error);
        
        throw new AppError('Can not fetch data of all the flights', StatusCodes.INTERNAL_SERVER_ERROR)   
    }
}

async function getFlight(id){
    try {
        const flight = await flightRepository.get(id)
        return flight;
    } catch (error) { 
       if(error.statusCode = StatusCodes.NOT_FOUND){
            throw new AppError('The flight you requested is not present', error.statusCode)
       }
    }
    throw new AppError('Can not fetch data of the flight', StatusCodes.INTERNAL_SERVER_ERROR)

}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight
}