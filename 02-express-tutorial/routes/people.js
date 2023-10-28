const express = require("express");
const router = express.Router();
const { addPerson, getPeople, getPerson, deletePerson } = require("../controllers/people");

router.get('/', getPeople)
router.post('/', addPerson)
router.get('/:id', getPerson)
router.delete('/:id', deletePerson)

module.exports = router