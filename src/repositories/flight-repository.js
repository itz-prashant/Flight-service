const CrudRepository = require('./crud-repositories')
const { Flight, Airplane} = require('../models')

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
}

module.exports = FlightRepository