import database from '../database/connect'

const getAllRaces = async () => {
   return await database.select().from('Race')
    
}


const getRaceById = async idRace => {
   const races = await database.where({idRace}).select('races', 'img').from('Race')
   return races
}

module.exports = {getAllRaces, getRaceById}