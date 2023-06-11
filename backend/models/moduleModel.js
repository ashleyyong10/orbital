const mongoose = require('mongoose')

const moduleSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    type: {
      type: String,
      required: [true, 'Please add a type'],
    },
    grade: {
      type: String,
      required: [true, 'Please add a grade value'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Module', moduleSchema)
