// https://bit.ly/2KQb0gR

const express = require('express')
const app = express()
const port = 3000
app.use(express.json())
let pokemons = []

class Pokemon {
    constructor(name, type) {
        this.name = name
        this.type = type
        this.id = null
        this.type2 = null
    }
}

function mockPokemon() {
    pokemons.push(createPokemon('Pikachu', 'Electric'))
    pokemons.push(createPokemon('Paras', 'Bug'))
}

function generateNewId(num) {
    return num + 1
}

function createPokemon(name, type) {
    let p = new Pokemon(name, type)
    p.id = generateNewId(pokemons.length)
    return p
}

function isSufficientParam(v) {
    return v !== undefined && v !== null && v !== ''
}

// Generate mock pokemons
mockPokemon()

// Root path
app.get('/', (req, res) => res.send('Hello World!!!!!!!'))

// GET /pokemons -> list all pokemons http://localhost:3000/pokemons
app.get('/pokemons', (req, res) => res.send(pokemons))

// POST /pokemons -> add pokemon to list
app.post('/pokemons', (req, res) => {
    if (!isSufficientParam(req.body.name)
        || !isSufficientParam(req.body.type)) {

        res.status(400).send({ error: 'Insufficient parameters: name and type are required parameter' })
        return
    }

    let p = createPokemon(req.body.name, req.body.type)
    pokemons.push(p)
    res.sendStatus(201)
})

// GET http://localhost:3000/pokemon/1
app.get('/pokemon/:id', (req, res) => {
    let id = req.params.id
    let p = pokemons[id - 1]
    res.send(p)
})

// PUT http://localhost:3000/pokemon/1
// Add type2
app.put('/pokemon/:id', (req, res) => {
    if (!isSufficientParam(req.body.type2)) {
        res.status(400).send({ error: 'Insufficient parameters: type2 is required parameter' })
        return
    }

    if (!isSufficientParam(req.params.id)) {
        res.status(400).send({ error: 'Insufficient parameters: id is required parameter' })
        return
    }

    let id = req.params.id
    let p = pokemons[id - 1]
    if (p === undefined) {
        res.status(400).send({ error: 'Cannot update pokemon: Pokemon is not found' })
        return
    }

    p.type2 = req.body.type2
    pokemons[id - 1] = p
    res.sendStatus(200)
})

app.listen(port, () => console.log(`Pokemon API listen on port ${port}`))