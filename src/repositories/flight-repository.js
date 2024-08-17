const CrudRepository = require('./crud-repositories')
const { Flight, Airplane} = require('../models')
const db = require('../models')
const { addRowLockOnFlights } = require('./queries')

class FlightRepository extends CrudRepository{
    constructor(){
        super(Flight)
    }

    async getAllFlights(filter, sort){
        const response = await Flight.findAll({
            where: filter,
            order: sort,
            include: [
                {
                    model: Airplane,
                    required: true,
                    as: 'airplaneDetail'
                },
               
            ]
        })
        return response
    }

    async updateRemainingSeats(flightId, seats, dec = true){
        await db.sequelize.query(addRowLockOnFlights(flightId))
        const flight = await Flight.findByPk(flightId)
        if(+dec){
            await flight.decrement('totalSeats', {by: seats})
        }else{
            await flight.increment('totalSeats', {by: seats})
        }
        return flight
    }
}

module.exports = FlightRepository