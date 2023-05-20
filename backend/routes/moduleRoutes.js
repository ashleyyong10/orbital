const express = require('express')
const router = express.Router()
const {getModule, setModule, updateModule, deleteModule} = require('../functions/moduleFunctions')


router.get('/', getModule )

router.post('/', setModule)

router.put('/:id', updateModule)

router.delete('/:id', deleteModule)

module.exports = router