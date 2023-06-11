const mongoose = require('mongoose')

const requirementSchema = mongoose.Schema(
  {
    major: {
      type: String,
      required: [true, 'Please add a major'],
    },
    core: {
      type: Array,
      required: [true, 'Please add a core module'],
    },
    ue: {
        type: Array,
        required: [true, 'Please add a ue module'],
      },
    id: {
        type: Array,
        required: [true, 'Please add a id module'],
    },
    cd: {
        type: Array,
        required: [true, 'Please add a cd module'],
    },

    ethics: {
        type: Array,
        required: [true, 'Please add a ethics module'],
    },


  },
)

module.exports = mongoose.model('Requirement', requirementSchema)