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
const Multa = require('./models/multa');
const Reserva = require('./models/reserva');
const Residente = require('./models/residente');
const Evento = require('./models/evento');

// Uri de MongoDB Atlas + params que hacen una coneccion 'tal cual como esta', y lo que se llama en mongoDB quede igual al proyecto.
mongoose.connect('mongodb+srv://condominium:VlaugjwS8bbLoZTA@cluster0.60rrfpl.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true }) 




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
    userName: String!
    email: String!
    pass: String!
    deuda: Int!
    condominio: Condominio
  }


  type Reserva{
    residente: Residente!
    espacio: Espacio
    pagado: Boolean
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
    fecha: Date
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

  input AdminInput {
    nombre: String!
    email: String!
    pass: String!
  }

  input DirectivaInput{
    nombre: String!
    email: String!
    pass: String!
  }
  
  input MultaInput{
    residente: String!
    fecha: Date!
    monto: Int
    comentario: String
  }

  input ReservaInput{
    residente: String!
    espacio: String!
    pagado: Boolean

  }
  
  input ResidenteInput{
    userName: String!
    email: String!
    pass: String!
    deuda: Int
    condominio: String

  }




  input CondominioInput {
      nombre: String!
  }

  input EspacioInput{
    nombre: String!
    reservado: Boolean!
  }

  type Query {
    getUsuarios: [Usuario]
    getUsuario(id: ID!): Usuario
    getConserjes: [Conserje]
    getConserje(id: ID!): Conserje
    getAdmin(id: ID!): Admin
    getCondominio(id: ID!): Condominio
    getCondominios: [Condominio]
    getDirectiva(id: ID!): Directiva
    getEspaciosByCondominio(id: ID!): [Espacio]
    getMulta(id:ID!): Multa
    getMultas: [Multa]
    getReserva(id:ID!): Reserva
    getReservas: [Reserva]
    getResidente(id:ID!): Residente
    getResidentes: [Residente]
  }

  type Mutation {
    addUsuario(input: UsuarioInput): Usuario
    updateUsuario(id: ID!, input: UsuarioInput): Usuario
    deleteUsuario(id: ID!): Alert

    addConserje(input: ConserjeInput, idCondominio: String): Conserje
    updateConserje(id: ID!, input: ConserjeInput): Conserje
    deleteConserje(id: ID!): Alert

    addSuperUser(input: SuperUserInput): SuperUser
    updateSuperUser(id: ID!, input: SuperUserInput): SuperUser

    addAdmin(input: AdminInput): Admin
    updateAdmin(id: ID!, input: AdminInput): Admin
    deleteAdmin(id: ID!): Alert

    addCondominio(id: ID!): Condominio
    updateCondominio(id: ID!): Condominio
    deleteCondominio(id: ID!): Alert

    addDirectiva(input: DirectivaInput): Directiva
    updateDirectiva(id: ID!, input: DirectivaInput): Directiva
    deleteDirectiva(id: ID!): Alert

    addEspacio(input: EspacioInput): Espacio
    updateEspacio(id: ID!, input: EspacioInput): Espacio
    deleteEspacio(id: ID!): Alert

    addMulta(input: MultaInput): Multa
    updateMulta(id: ID!, input: MultaInput): Multa
    deleteMulta(id: ID!): Alert

    addReserva(input: ReservaInput): Reserva
    updateReserva(id: ID!, input: ReservaInput): Reserva
    deleteReserva(id: ID!): Alert

    addResidente(input: ResidenteInput): Residente
    updateResidente(id: ID!, input: ResidenteInput): Residente
    deleteResidente(id: ID!): Alert

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
        async getCondominios(obj) {
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
            
            return await conserje.populate('condominio');
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

        //multa reserva y residente

        async getMulta(obj, { id }) {
            const multa = await Multa.findById(id);
            return multa;
        },
        async getMultas(obj) {
            return await Multa.find();
        },

        async getReserva(obj, { id }) {
            const reserva = await Reserva.findById(id);
            return reserva;
        },
        async getReservas(obj) {
            return await Reserva.find();
        },
        async getResidente(obj, { id }) {
            const residente = await Residente.findById(id);
            return residente;
        },
        async getResidentes(obj) {
            return await Residente.find();
        }
        




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
        },

        //Admin
        async addAdmin(obj, { input }) {
            const admin = new Admin(input);
            await admin.save();
            return admin;
        },
        async updateAdmin(obj, { id, input }) {
            const admin = await admin.findByIdAndUpdate(id, input);
            return admin;
        },
        async deleteAdmin(obj, { id }) {
            await Admin.deleteOne({ _id: id });
            return {
                message: "Admin Eliminado"
            }
        },

        //Condominio
        async addCondominio(obj, { input }) {
            const condominio = new Condominio(input);
            await condominio.save();
            return condominio;
        },
        async updateCondominio(obj, { id, input }) {
            const condominio = await admin.findByIdAndUpdate(id, input);
            return condominio;
        },
        async deleteCondominio(obj, { id }) {
            await Condominio.deleteOne({ _id: id });
            return {
                message: "Condominio Eliminado"
            }
        },

        //Directiva
        async addDirectiva(obj, { input }) {
            const directiva = new Directiva(input);
            await directiva.save();
            return directiva;
        },
        async updateDirectiva(obj, { id, input }) {
            const directiva = await admin.findByIdAndUpdate(id, input);
            return directiva;
        },
        async deleteDirectiva(obj, { id }) {
            await Directiva.deleteOne({ _id: id });
            return {
                message: "Directiva Eliminada"
            }
        },

        //Espacio
        async addEspacio(obj, { input }) {
            const espacio = new Espacio(input);
            await espacio.save();
            return espacio;
        },
        async updateEspacio(obj, { id, input }) {
            const espacio = await admin.findByIdAndUpdate(id, input);
            return espacio;
        },
        async deleteEspacio(obj, { id }) {
            await Espacio.deleteOne({ _id: id });
            return {
                message: "Espacio Eliminado"
            }
        },


        //Multa

        async addMulta(obj, { input }) {
            const multa = new Multa(input);
            await multa.save();
            return multa;
        },
        async updateMulta(obj, { id, input }) {
            const multa = await Multa.findByIdAndUpdate(id, input);
            return multa;
        },
        async deleteMulta(obj, { id }) {
            await Multa.deleteOne({ _id: id });
            return {
                message: "Multa Eliminada"
            }
        },

        //reserva
        async addReserva(obj, { input }) {
            const reserva = new Reserva(input);
            await reserva.save();
            return reserva;
        },
        async updateReserva(obj, { id, input }) {
            const reserva = await Reserva.findByIdAndUpdate(id, input);
            return reserva;
        },
        async deleteReserva(obj, { id }) {
            await Reserva.deleteOne({ _id: id });
            return {
                message: "Reserva Eliminada"
            }
        },

        //residente

        async addResidente(obj, { input }) {
            const residente = new Residente(input);
            await residente.save();
            return residente;
        },
        async updateResidente(obj, { id, input }) {
            const residente = await Residente.findByIdAndUpdate(id, input);
            return residente;
        },
        async deleteResidente(obj, { id }) {
            await Residente.deleteOne({ _id: id });
            return {
                message: "Residente Eliminado"
            }
        },



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