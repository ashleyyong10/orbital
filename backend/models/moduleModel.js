const mongoose = require('mongoose')

const moduleSchema = mongoose.Schema(
    {
        text: {
            type: String,
            required: [true, 'Please add a module']
        },
    }, 
    {
    timestamps: true,
    } 
)

module.exports = mongoose.model('Module', moduleSchema)
//first param shows informs which collection it links to