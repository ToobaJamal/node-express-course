const { people } = require("../data")

const getPeople = (req, res) => {
    res.status(200).json({ success: true, data: people })
  }
  
  const addPerson = (req, res) => {
    const { name } = req.body
    if (!name) {
      return res
        .status(400)
        .json({ success: false, msg: 'please provide name value' })
    }
    people.push({ id: people.length + 1, name });
    res.status(201).send({ success: true, person: name })
  }

  const getPerson = (req, res) => {
    const person = people.find((person) => person.id === Number(req.params.id))
    if(!person) {
        return res
        .status(400)
        .json({ success: false, message: 'invalid id' })
    }
    res.status(200).send({ success: true, person })
  }

  const deletePerson = (req, res) => {
    const person = people.find((person) => person.id === Number(req.params.id))
    if (!person) {
      return res
        .status(404)
        .json({ success: false, message: "invalid id" })
    }
    const newPeople = people.filter(
      (person) => person.id !== Number(req.params.id)
    )
    return res.status(200).json({ success: true, data: newPeople })
  }


  module.exports = {
    getPeople,
    addPerson,
    getPerson,
    deletePerson
  }