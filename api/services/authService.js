import jwt from 'jsonwebtoken'

const secret = 'supersecret';

const generateToken = (idUser, username) => {
    return jwt.sign({ idUser, username}, secret)
}


module.exports = { generateToken }

