import { generateHash, compareHash } from '../services/criptografyService'

import database from '../database/connect'


const createUser = async user => {
    const { username, password, email, image} = user
    const emailValidate = await emailExists(email)
    if (!emailValidate) {
        throw "E-mail já existe."
    }
    if(username.length > 12) {
        throw "Numero máximo de caracteres é 12"
    }
    if (!username || !password || !image) {
        throw "Preencha os campos"
    }
    if (password.length < 5) {
        throw "Numero minimo de caracteres é 6"
    }
    const emailChecked = await emailIsValid(email)
    if (!emailChecked) {
        throw "E-mail inválido"
    }

    const passwordHashed = generateHash(password)
    await database.insert({ username, email, password: passwordHashed, image }).into('User')

}
const emailExists = async email => {
    const emailMatched = await database.where({ email }).select('email').from('User')

    if (emailMatched.length > 0) {
        return false
    }
    return true

}
const emailIsValid = async email => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(String(email).toLowerCase())
}

const getAllUsers = async () => {
    return await database.select('idUser', 'username').into('User')
}
const compareUser = async user => {
    const { password, email } = user

    if (!password) {
        throw "Senha inválida"
    }
    const emailIsValid = await emailExists(email)
    if (emailIsValid) {
        throw "E-mail não existe"
    }
    const users = await database.where({ email }).select('password').from('User')
    const passwordChecked = compareHash(password, users[0].password)

    if (!passwordChecked) {
        throw "Senha inválida"
    }
}

const getUserById = async idUser => {
    return await database.where({ idUser }).select('idUser', 'username','image').from('User')
}

const getUserByEmail = async email => {
    return await database.where({ email }).select('idUser', 'username').from('User')
}

const login = async user => {
    return await compareUser(user)
}

module.exports = { createUser, getAllUsers, login, getUserById, getUserByEmail }
