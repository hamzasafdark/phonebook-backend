require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')

const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

morgan.token('request-body', (request, response) => JSON.stringify(request.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request-body'))

// let persons = [
//     {
//         "id": 1,
//         "name": "Arto Hellas",
//         "number": "040-123456"
//     },
//     {
//         "id": 2,
//         "name": "Ada Lovelace",
//         "number": "39-44-5323523"
//     },
//     {
//         "id": 3,
//         "name": "Dan Abramov",
//         "number": "12-43-234345"
//     },
//     {
//         "id": 4,
//         "name": "Mary Poppendieck",
//         "number": "39-23-6423122"
//     }
// ]

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.get('/info', (request, response) => {
    const number = persons.length
    const date = new Date()
    console.log(number, date)
    const data = `<h4>Phonebook has info for ${number} people<br/>${date}</h4>`
    response.send(data)
})

app.delete('/api/persons/:id', (request, response) => {
    Note.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.post('/api/persons', (request, response) => {
    const generateId = () => {
        const getRandomInt = () => Math.floor(Math.random() * (Math.floor(1000000) - Math.ceil(persons.length) + 1) + Math.ceil(persons.length))
        return getRandomInt()
    }

    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: "name must be defined"
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: "number must be defined"
        })
    }

    if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            name: "name must be unique"
        })
    }

    const person = new Person({
        id: generateId(),
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
