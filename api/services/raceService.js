import database from '../database/connect'

const getAllRaces = async () => {
   return await database.select().from('Race')
    
}

module.exports = {getAllRaces}