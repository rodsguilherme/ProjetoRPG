import { generateHash, compareHash } from '../services/criptografyService'

import database from '../database/connect'


const createUser = async user => {
    const { username, password, email } = user

    if (!username || !password) {
        throw "Preencha os campos"
    }
    const emailChecked = await emailIsValid(email)
   
    if (!emailChecked) {
        throw "Email incorreto ou já existe."
    }
    const passwordHashed = generateHash(password)
    await database.insert({ username, email, password: passwordHashed }).into('User')

}
const emailIsValid = async email => {
    const emailMatched = await database.where({ email }).select('email').from('User')
    console.log(emailMatched.length)

    if (emailMatched.length > 0) {
        return false
    }
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   
    return emailRegex.test(String(email).toLowerCase())

}

const getAllUsers = async () => {
    return await database.select('idUser', 'username').into('User')
}
const compareUser = async user => {
    const { username, password, email } = user

    if (!password || !username) {
        return false
    }

    const users = await database.where({ email }).select('password').from('User')
    if (users.length == 0) {
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

const login = async user => {
    return await compareUser(user)
}

module.exports = { createUser, getAllUsers, getUserByName, login, getUserById }
