import bcrypt from 'bcrypt'

const generateHash = (text) => {
    return bcrypt.hashSync(text, 10)
}

const compareHash = (textToCompare, textHashed) => {
    return bcrypt.compareSync(textToCompare, textHashed)
}

module.exports = { generateHash, compareHash }