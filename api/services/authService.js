import jwt from 'jsonwebtoken'

const secret = 'supersecret';

const generateToken = idUser => {
    return jwt.sign({ id: idUser}, secret)
}


module.exports = { generateToken }

