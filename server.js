// Nucleo del servicio, donde se va a armar el backend.
const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const { ApolloServer, gql } = require('apollo-server-express'); // Instalamos submodulos del require

const { merge } = require('lodash');

const Usuario = require('./models/usuario'); // no hace falta especificar que es .js, JS lo asume.
const Conserje = require('./models/conserje');
const SuperUser = require('./models/superUser');
const Condominio = require('./models/condominio');


mongoose.connect('mongodb+srv://condominium:VlaugjwS8bbLoZTA@cluster0.60rrfpl.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true }) // Uri de MongoDB Atlas + params que hacen una coneccion 'tal cual como esta', y lo que se llama en mongoDB quede igual al proyecto.

const typeDefs = gql `
scalar Date

type Usuario{
    id: ID!
    nombre: String!
    email: String!
    pass: String!
}

type Admin{
    id: ID!
    nombre: String!
    email: String!
    pass: String!
    condominio: Condominio
}

type Directiva{
    id: ID!
    nombre: String!
    email: String!
    pass: String!
    condominio: Condominio
}

type Conserje{
    id: ID!
    userName: String! 
    email: String!
    pass: String!
    condominio: Condominio!
}


type Residente{
    id: ID!
    nombre: String!
    email: String!
    pass: String!
    deuda: Int!
    condominio: Condominio
}

type LibroGasto{
    cantidad: Int!
    condominio: Condominio!
    gastos: [GastoComun]
}

type GastoComun{
    tipo: String
    vencimiento: Date!
    monto: Int!
    residente: Residente!
    glosa: String
    libro: LibroGasto!
}

type LibroEvento{
    cantidad: Int!
    condominio: Condominio!
    gastos: [GastoComun]
}

type Evento{
    conserje: Conserje!
    glosa: String!
    libro: LibroEvento!
}

type Multa{
    residente: Residente
    fecha: Date
    monto: Int
    comentario: String
}

type Condominio{
    id: ID!
    nombre: String!
    admin: [Admin]
    directiva: [Directiva]
    conserjes: [Conserje]
    residente: [Residente]
    libroEvento: LibroEvento
    libroGasto: LibroGasto
}

type SuperUser{
    id: ID!
    userName: String!
    pass: String!
    email: String!
}

type Alert {
    message: String
}

input SuperUserInput{
    userName: String!
    email: String!
    pass: String!
}

input UsuarioInput {
    nombre: String!
    email: String!
    pass: String!
}

input ConserjeInput {
    userName: String!
    email: String!
    pass: String!
}

input CondominioInput {
    nombre: String!
}


type Query {
    getUsuarios: [Usuario] 
    getUsuario(id:ID!) : Usuario
    getConserjes: [Conserje]
    getConserje(id:ID!) : Conserje
    getCondominio: [Condominio]
}

type Mutation {
    addUsuario(input : UsuarioInput) : Usuario
    addCondominio(input : CondominioInput) : Condominio
    updateUsuario(id: ID!, input: UsuarioInput) : Usuario
    deleteUsuario(id: ID!) : Alert
    addConserje(input: ConserjeInput, idCondominio: String): Conserje
    updateConserje(id: ID!, input: ConserjeInput) : Conserje
    deleteConserje(id: ID!) : Alert
    addSuperUser(input: SuperUserInput): SuperUser
    updateSuperUser(id: ID!, input: SuperUserInput) : SuperUser

}
`

// tilde grave indica que se hace una interpolacion de string en lo que esta dentro
// Exclamacion porque es MANDATORY

// Type Query es para retornar estructuras, el nombre del elemento y una estructura de datos.


//Cada vez que el codigo llame a un metodo, ¿que codigo debe ejecutar?
// Aqui abajito!

const resolvers = {
    Query: {
        async getUsuarios(obj) {
            return await Usuario.find();
        },
        async getCondominio(obj) {
            const condo = await Condominio.find().populate('conserjes');
            return condo;
        },

        //Buscar x ID
        async getUsuario(obj, { id }) {
            const usuario = await Usuario.findById(id);
            return usuario;
        },
        async getConserjes(obj) {
            return await Conserje.find();
        },
        async getConserje(obj, { id }) {
            const conserje = await Conserje.findById(id);
            
            return await conserje.populate('condominio');
        },
    },
    Mutation: {

        async addCondominio(obj, { input }) {
            const condo = new Condominio(input);
            await condo.save();
            return condo;
        },



        //Agregar usuarios
        async addUsuario(obj, { input }) {
            const usuario = new Usuario(input);
            await usuario.save();
            return usuario;
        },

        //Update Usuarios
        async updateUsuario(obj, { id, input }) {
            const usuario = await usuario.findByIdAndUpdate(id, input);
            return usuario;
        },

        //Eliminar usuarios
        async deleteUsuario(obj, { id }) {
            await Usuario.deleteOne({ _id: id });
            return {
                message: "Usuario Eliminado"
            }
        },
        async addConserje(_, { input, idCondominio}) {
            const condo = await Condominio.findById(idCondominio);
            let conserje = new Conserje({... input, condominio: condo._id });
            conserje = await conserje.save();
            console.log(condo);
            console.log(conserje);
            condo.conserjes.push(conserje);
            await condo.save();
            return await conserje.populate('condominio');
        },
        async updateConserje(obj, { id, input }) {
            const conserje = await conserje.findByIdAndUpdate(id, input);
            return conserje;
        },

        
        async deleteConserje(obj, { id }) {
            await Conserje.deleteOne({ _id: id });
            return {
                message: "Conserje Eliminado"
            }
        },
        //superusuario
        async addSuperUser(obj, { input }) {
            const superUsuario = new SuperUser(input);
            await superUsuario.save();
            return superUsuario;
        },

        
        async updateSuperUser(obj, { id, input }) {
            const superUsuario = await superUsuario.findByIdAndUpdate(id, input);
            return superUsuario;
        }

    }
}

//Sincronizar ApolloServer con Express

let apolloServer = null;

const corsOptions = {
    origin: "http://localhost:8090",
    credentials: false
};

//Conectar el servidor
// Levanta a apollo, y apollo espera a express
async function startServer() {
    const apolloServer = new ApolloServer({ typeDefs, resolvers, corsOptions });
    await apolloServer.start();

    apolloServer.applyMiddleware({ app, cors: false });
}

startServer();
const app = express();

app.use(cors());
app.listen(8090, function() {
    console.log("servidor Iniciado!!")
})