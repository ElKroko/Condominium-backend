// Nucleo del servicio, donde se va a armar el backend.
const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const { ApolloServer, gql } = require('apollo-server-express'); // Instalamos submodulos del require

const { merge } = require('lodash');

const Usuario = require('./models/usuario'); // no hace falta especificar que es .js, JS lo asume.

mongoose.connect('mongodb+srv://condominium:VlaugjwS8bbLoZTA@cluster0.60rrfpl.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true }) // Uri de MongoDB Atlas + params que hacen una coneccion 'tal cual como esta', y lo que se llama en mongoDB quede igual al proyecto.

const typeDefs = gql `
type Usuario{
    id: ID!
    nombre: String!
    email: String!
    pass: String!
}

type Condominio{
    id: ID!
    admin: [Admin]
    directiva: [Directiva]
    conserje: [Conserje]
    residente: [Residente]
    libroEvento: [Libro]
    gastosComunes: [GastosComunes]
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

input UsuarioInput {
    nombre: String!
    email: String!
    pass: String!
}

type Query {
    getUsuarios: [Usuario] 
    getUsuario(id:ID!) : Usuario
}

type Mutation {
    addUsuario(input : UsuarioInput) : Usuario
    updateUsuario(id: ID!, input: UsuarioInput) : Usuario
    deleteUsuario(id: ID!) : Alert
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

        //Buscar x ID
        async getUsuario(obj, { id }) {
            const usuario = await Usuario.findById(id);
            return usuario;
        }
    },
    Mutation: {

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