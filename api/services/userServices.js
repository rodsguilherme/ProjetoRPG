import { generateHash, compareHash } from '../services/criptografyService'

import database from '../database/connect'

const createUser = async user => {
    const { username, password } = user

    if (!FieldsAreValid(user)) {
        throw "Usuário ou senha incorretos."
    }
    const passwordHashed = generateHash(password)
    await database.insert({ username, password: passwordHashed }).into('User')

}
const FieldsAreValid = user => {
    const { username, password } = user;

    if (!username || !password) {
        return false
    }
    return true
}

const getAllUsers = async () => {
    return await database.select('idUser', 'username').into('User')
}

const compareUser = async user => {
    const { username, password } = user

    if (!username || !password) {
        return false
    }

    const users = await database.where({username}).select('password').from('User')
    if (users < 0) {
        return false
    }
    const passwordChecked = await compareHash(password, users[0].password)
    if (!passwordChecked) {
        return false
    }
    return true
}

const getUserByName = async username => {
    return await database.where({ username }).select('idUser').from('User')

}

const login = async user => {
    return await compareUser(user)
}

module.exports = { createUser, getAllUsers, compareUser, getUserByName, login }
