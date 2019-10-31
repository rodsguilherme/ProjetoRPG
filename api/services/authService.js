import jwt from 'jsonwebtoken'

const secret = 'supersecret';

const generateToken = idUser => {
    return jwt.sign({ idUser }, secret)
}


module.exports = { generateToken }

