const bcrypt = require('bcrypt')
const helpers = {}

helpers.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

helpers.compare = async(password, newPassword) => {
    try {
        return bcrypt.compare(password, newPassword)
    } catch (error) {
        console.log(error)
    }
}

module.exports = helpers