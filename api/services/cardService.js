import database from '../database/connect'

const createCard = async card => {
    const { name, alignment, idRace, idKind, charisma, intelligence,
        dexterity, winsdow, constitution, strength, hp } = card;

    await database.insert({
        idUser: 1, name, alignment, idRace, idKind, charisma, intelligence,
        dexterity, winsdow, constitution, strength, hp
    }).into('Card')
}

const getCardByUser = async (idUser) => {
    const cards = database.from('Card').innerJoin('Race', `Card.idRace`, `Race.idRace`)
    .innerJoin('Kind', `Card.idKind`, `Kind.idKind`).orderBy(`Race.idRace`).where({idUser})
    if(cards.length == 0) {
        throw "Opa, parece que ainda não tem cards salvos. :)"
    }
    return cards
}

const getCardById = async idCard => {
    const cards = database.where({idCard}).select('*');from('Card')
    return cards
}
module.exports = {createCard, getCardByUser, getCardById}