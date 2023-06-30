const express = require('express')
const router = express.Router()
const peopleController = require('../controllers/people')

router.get('/', peopleController.getPeople)

router.post('/', peopleController.addPerson)

router.get('/:id', peopleController.getPersonById)

router.put('/:id', peopleController.updatePersonNameById)

router.delete('/:id', peopleController.deletePersonById)

module.exports = router;