import jwt from 'jsonwebtoken'
import { decode } from 'punycode'

const privateKey = 'supersecretpass'


const generateToken = idUser => {
    return jwt.sign({ idUser }, privateKey)
}

const verifyJWT = (ctx, next) => {
    var token = ctx.request.headers['x-access-token'] || ctx.request.headers['authorization']
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    else {
        return ctx.status = 401
    }

    jwt.verify(token, privateKey, (err, decoded) => {
        if(err) return ctx.status = 401
        ctx.request.idUser = decoded.idUser;
        next()
    })
}

module.exports = {generateToken, verifyJWT}

