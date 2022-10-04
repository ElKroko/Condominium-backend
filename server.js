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


mongoose.connect('mongodb+srv://condominium:VlaugjwS8bbLoZTA@cluster0.60rrfpl.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true }) // Uri de MongoDB Atlas + params que hacen una coneccion 'tal cual como esta', y lo que se llama en mongoDB quede igual al proyecto.

const typeDefs = gql `
  scalar Date

  type Admin {
    id: ID!
    nombre: String!
    email: String!
    pass: String!
    condominio: Condominio
  }

  type Condominio {
    id: ID!
    admin: [Admin]
    directiva: [Directiva]
    conserje: [Conserje]
    residente: [Residente]
    libroEvento: LibroEvento
    libroGasto: LibroGasto
    espacios: [Espacio]
  }

  type Conserje {
    id: ID!
    userName: String!
    email: String!
    pass: String!
    condominio: Condominio
  }

  type Directiva {
    id: ID!
    nombre: String!
    email: String!
    pass: String!
    condominio: Condominio
  }

  type Espacio {
    nombre: String!
    reserva: Reserva
    reservado: Boolean!
  }

  type Evento {
    conserje: Conserje!
    glosa: String!
    libro: LibroEvento!
  }

  type GastoComun {
    tipo: String
    vencimiento: Date!
    monto: Int!
    residente: Residente!
    glosa: String
    libro: LibroGasto!
  }

  type LibroEvento {
    cantidad: Int!
    condominio: Condominio!
    gastos: [GastoComun]
  }

  type LibroGasto {
    cantidad: Int!
    condominio: Condominio!
    gastos: [GastoComun]
  }

  type Multa {
    residente: Residente
    fecha: Date
    monto: Int
    comentario: String
  }

  type Residente {
    id: ID!
    nombre: String!
    email: String!
    pass: String!
    deuda: Int!
    condominio: Condominio
  }

  type SuperUser {
    id: ID!
    userName: String!
    pass: String!
    email: String!
  }

  type Usuario {
    id: ID!
    nombre: String!
    email: String!
    pass: String!
  }

  type Alert {
    message: String
  }

  input SuperUserInput {
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

  type Query {
    getUsuarios: [Usuario]
    getUsuario(id: ID!): Usuario
    getConserjes: [Conserje]
    getConserje(id: ID!): Conserje
    getAdmin(id: ID!): Admin
    getCondominio(id: ID!): Condominio
    getDirectiva(id: ID!): Directiva
    getEspaciosByCondominio(id: ID!): [Espacio]
  }

  type Mutation {
    addUsuario(input: UsuarioInput): Usuario
    updateUsuario(id: ID!, input: UsuarioInput): Usuario
    deleteUsuario(id: ID!): Alert
    addConserje(input: ConserjeInput): Conserje
    updateConserje(id: ID!, input: ConserjeInput): Conserje
    deleteConserje(id: ID!): Alert
    addSuperUser(input: SuperUserInput): SuperUser
    updateSuperUser(id: ID!, input: SuperUserInput): SuperUser
  }
`;

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
        },
        async getConserjes(obj) {
            return await Conserje.find();
        },
        async getAdmin(obj, { id }) {
            const admin = await Admin.findById(id);
            return admin;
        },
        async getCondominio(obj, { id }) {
            const condominio = await Condominio.findById(id);
            return condominio;
        },
        async getConserje(obj, { id }) {
            const conserje = await Conserje.findById(id);
            return conserje;
        },
        async getDirectiva(obj, { id }) {
            const directiva = await Directiva.findById(id);
            return directiva;
        },
        async getEspaciosByCondominio(obj, { id }) { //! Aca, se supone que se le debe entregar el id del condominio, cierto? de ser asi, el input debe cambiar su nombre? Y se le puede colocar un nombre descriptivo a la variable del input? o debe tener el mismo nombre presente en el Template String?

            const condominio = await Condominio.findById(id);
            const espacios = condominio.espacios;
            return espacios;
        },
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
        },
        async addConserje(obj, { input }) {
            const conserje = new Conserje(input);
            await conserje.save();
            return conserje;
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