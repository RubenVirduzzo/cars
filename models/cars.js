const mongoose = require('mongoose')

const carSchema = mongoose.Schema({
    marca: {
        type: String,
        required: true
    },
    potencia: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        required: true,
        trim: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Car', carSchema)