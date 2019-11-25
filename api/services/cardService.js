import database from '../database/connect'

const createCard = async card => {
    const { name, alignment, idRace, idKind, charisma, intelligence,
        dexterity, winsdow, constitution, strength } = card;

    await database.insert({
        idUser: 1, name, alignment, idRace, idKind, charisma, intelligence,
        dexterity, winsdow, constitution, strength
    }).into('Card')
}
module.exports = createCard