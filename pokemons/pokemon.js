let pokemons = []
mockPokemon()

function Pokemon(name, type) {
    this.name = name
    this.type = type
    this.id = null
    this.type2 = null
}

function savePokemon(name, type) {
    let p = createPokemon(name, type)
    pokemons.push(p)
    return true
}

function createPokemon(name, type) {
    let p = new Pokemon(name, type)
    p.id = generateNewId(pokemons.length)
    return p
}

function mockPokemon() {
    pokemons.push(createPokemon('Pikachu', 'Electric'))
    pokemons.push(createPokemon('Paras', 'Bug'))
}

function generateNewId(num) {
    return num + 1
}

function isPokemonExisted(id) {
    return pokemons[id-1] !== undefined && pokemons[id-1] !== null
}

function getPokemon(id) {
    return pokemons[id - 1]
}

function update(pokemon) {
    pokemons[pokemon.id - 1] = pokemon
    return true
}

module.exports.isPokemonExisted = isPokemonExisted
module.exports.savePokemon = savePokemon
module.exports.getPokemon = getPokemon
module.exports.update = update