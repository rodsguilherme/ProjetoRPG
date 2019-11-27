import database from '../database/connect'

const getAllKinds = async () => {
    return await database.select('*').from('Kind')
}

module.exports = getAllKinds