const mongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

const DB_URL = "mongodb+srv://admin:tanatorn@cluster0-sjnca.gcp.mongodb.net/admin?retryWrites=true&w=majority"
const DB_NAME = "example"
const option = { useNewUrlParser : true, useUnifiedTopology: true }
var conllection,database
//   การทำงาน callbackfunction 
    // m.connect(url,options,connectMongo) ถ้าทำงานเสร็จ แล้วจะเรียก connectMongo ให้ โดยได้รับค่ามาสองตัว
    // funciton connectMongo( err,client) ต้องรับสองตัวเสมอ  ถ้าทำงานเสร็จ แล้ว

let pokemons = []
mockPokemon()

function Pokemon(name, type) {
    this.name = name
    this.type = type
    this.id = null
    this.type2 = null
}



async function getPokemon(id) {
    var client  = await mongoClient.connect(DB_URL,option)
       .catch(err=>console.log("can't connect ")) 

    database = client.db(DB_NAME)
    conllection = database.collection('pokemons')
    try{
        var result = await conllection.find({ _id:ObjectID(id)}).toArray()
        return result
    }catch(err){
          console.log(err)        
         return err
    }finally{
          client.close()
    }
}
async function getPokemonAll(){
    var client = await mongoClient.connect(DB_URL,option)
                .catch(err=>console.log("can't connect ")) 

    database = client.db(DB_NAME)
    conllection = database.collection('pokemons')
    try{
        var result = await conllection.find({}).toArray()
        return result
    }catch(err){
        console.log(err)        
        return err
    }finally{
        client.close()
    }
}

async function savePokemon(name, type) {
   
    let p = createPokemon(name, type)
  
    var client = await mongoClient.connect(DB_URL,option)//ทำงานเสร็จ รอผลการทำงานจาก  mongoClient.connect(DB_URL,option) กลับมาใส่ตัวแปร cilent 
    .catch(err=>console.log("can't connect ")) 

        database = client.db(DB_NAME)
        conllection = database.collection('pokemons')
        try{
            var result = await conllection.insert(p)
            return true
        }catch(err){
            console.log(err)
            return false 
        }finally{
            client.close()
        }
}
// function savePokemon(name, type) {
//     let p = createPokemon(name, type)
    
//     const DB_URL = "mongodb+srv://admin:tanatorn@cluster0-sjnca.gcp.mongodb.net/admin?retryWrites=true&w=majority"
//     const DB_NAME = "example"
//     var conllection,database

//     mongoClient.connect(DB_URL,{ useNewUrlParser : true,useUnifiedTopology: true },(error,client)=>{
//         if(error){
//             throw error 
//         }
//         database = client.db(DB_NAME)
//         conllection = database.collection('pokemons')
//         conllection.insert(p,(err,result)=>{
//             if(err) return false 
        
//             return true
//         })
//     })
// }

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



async function update(pokemon) {
     
    var client = await mongoClient.connect(DB_URL,option)//ทำงานเสร็จ รอผลการทำงานจาก  mongoClient.connect(DB_URL,option) กลับมาใส่ตัวแปร cilent 
    .catch(err=>console.log("can't connect ")) 

        database = client.db(DB_NAME)
        conllection = database.collection('pokemons')
    try {
        var result = await collection.updateOne({ _id: ObjectID(pokemon._id)}, { $set: { type2: pokemon.type2 } })
        return true
    } catch(err) {
        console.log(err)
        return false
    } finally {
        client.close()
    }
    // pokemons[pokemon.id - 1] = pokemon
    // return true
}

module.exports.isPokemonExisted = isPokemonExisted
module.exports.savePokemon = savePokemon
module.exports.getPokemon = getPokemon
module.exports.getPokemonAll = getPokemonAll
module.exports.update = update