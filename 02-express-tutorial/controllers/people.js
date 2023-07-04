const { people } = require('../data')

// function to get people
const getPeople = (req, res) => {
    res.send(people)
    res.json({people});
}

// function to add a person
const addPerson = (req, res) => {
    const {name} = req.body

    if(!name) {
        return res
            .status(400)
            .json({ success: false, message: "Please provide a name" })
    }
    res.status(201).json({ success: true, person: name })
    people.push({ id: people.length, name: req.body.name })
}

// function to find a person by id
const getPersonById = (req, res) => {
    const { id } = req.params

    const person = people.find((person) => person.id === parseInt(id))

    if (person) {
        res.status(200).json({ success: true, data: person })
    } else {
        return res
            .status(404)
            .json({success: false, message: `There is no person matching id ${id}`})
    }
}

// function to update the people entry if it is found
const updatePersonNameById = (req, res) => {
    const { id } = req.params
    const { name } = req.body

    const person = people.find((person) => person.id === parseInt(req.params.id))

    if (!person) {
        return res
            .status(404)
            .json({success: false, message: `There is no person matching id ${id}`})
    }
    const newPeople = people.map((person) => {
        if (person.id === parseInt(id)) {
            person.name = name
        }
        return person
    })
    res.status(200).json({ success: true, data: newPeople })
}

// function to delete an entry
const deletePersonById = (req, res) => {
    const person = people.find((person) => person.id === parseInt(req.params.id))
    
    if (!person) {
        return res
            .status(404)
            .json({success: false, message: `There is no person with matching ID ${req.params.id}`})
    }
    const newPeople = people.filter(
        (person) => person.id !== parseInt(req.params.id)
    )
    return res.status(200).json({ success: true, data: newPeople })
}

module.exports = { addPerson, getPeople, getPersonById, updatePersonNameById, deletePersonById }