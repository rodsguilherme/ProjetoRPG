import { generateHash, compareHash } from '../services/criptografyService'

import database from '../database/connect'


const createUser = async user => {
    const { username, password } = user

    if (!username || !password) {
        throw "Preencha os campos"
    }
    await usernameIsValid(username)
    const passwordHashed = generateHash(password)
    await database.insert({ username, password: passwordHashed }).into('User')

}
const usernameIsValid = async username => {
    const user = await getUserByName(username)
    if (user.length > 0) {
        throw ("Nome de usuário em uso")
    }

}

const getAllUsers = async () => {
    return await database.select('idUser', 'username').into('User')
}
const compareUser = async user => {
    const { username, password } = user

    if (!password || !username) {
        return false
    }

    const users = await database.where({ username }).select('password').from('User')
    if (users.length <= 0) {
        return false
    }
    const passwordChecked = compareHash(password, users[0].password)

    return passwordChecked
}

const getUserByName = async (username) => {
    return await database.where({ username }).select('idUser').from('User')

}

const getUserById = async idUser => {
    return await database.where({ idUser }).select('idUser', 'username').from('User')
}

const updateUser = async user => {
    const { username, id } = user

    if (!username) {
        throw ("Preencha os campos.")
    }
    const usernameExists = await getUserByName(username)
    if (usernameExists.length > 0) {
        throw ("Nome já existe")
    }
    return await database('User').where({ idUser: id.idUser }).update({ username })
}

const login = async user => {
    return await compareUser(user)
}

module.exports = { createUser, getAllUsers, getUserByName, login, getUserById, updateUser }
