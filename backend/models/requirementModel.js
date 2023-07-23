const mongoose = require('mongoose')

const requirementSchema = mongoose.Schema(
  {
    major: {
      type: String,
      required: [true, 'Please add a major'],
    },
    Core: {
      type: Array,
      required: [true, 'Please add a core module'],
    },
    CoreNo: {
      type: Number,
      required: [true, 'Please add a CoreNo'],
    },
    UE: {
        type: Array,
        required: [true, 'Please add a ue module'],
      },
    ID: {
        type: Array,
        required: [true, 'Please add a id module'],
    },
    CD: {
        type: Array,
        required: [true, 'Please add a cd module'],
    },

    Ethics: {
        type: Array,
        required: [true, 'Please add a ethics module'],
    },


  },
)

module.exports = mongoose.model('Requirement', requirementSchema)