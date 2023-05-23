const express = require('express')
const router = express.Router()
const {getModule, setModule, updateModule, deleteModule} = require('../functions/moduleFunctions')
const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getModule )

router.post('/', protect, setModule)

router.put('/:id', protect, updateModule)

router.delete('/:id', protect, deleteModule)

module.exports = router