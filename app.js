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

// Generate mock pokemons
mockPokemon()

// Root path
app.get('/', (req, res) => res.send('Hello World!!!!!!!'))

// GET /pokemons -> list all pokemons http://localhost:3000/pokemons
app.get('/pokemons', (req, res) => res.send(pokemons))

// POST /pokemons -> add pokemon to list
app.post('/pokemons', (req, res) => {
    let p = createPokemon(req.body.name, req.body.type)
    pokemons.push(p)
    res.sendStatus(201)
})

app.listen(port, () => console.log(`Pokemon API listen on port ${port}`))