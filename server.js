// Nucleo del servicio, donde se va a armar el backend.


const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const {ApolloServer, gql} = require('apollo-server-express');    // Instalamos submodulos del require


const {merge} = require('lodash');


const Usuario = require('./models/usuario'); // no hace falta especificar que es .js, JS lo asume.
const Conserje = require('./models/conserje');
const SuperUser = require('./models/superUser');
const Evento = require('./models/evento');



mongoose.connect('mongodb+srv://condominium:VlaugjwS8bbLoZTA@cluster0.60rrfpl.mongodb.net/test', {useNewUrlParser: true, useUnifiedTopology: true}) // Uri de MongoDB Atlas + params que hacen una coneccion 'tal cual como esta', y lo que se llama en mongoDB quede igual al proyecto.



const typeDefs = gql`
type Usuario{
    id: ID!
    nombre: String!
    correo: String!
    pass: String!
}

<<<<<<< Updated upstream
type Alert {
=======
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
>>>>>>> Stashed changes
    message: String
}

input UsuarioInput {
    nombre: String!
    correo: String!
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
        async getUsuarios(obj){
            return await Usuario.find();
        },

        //Buscar x ID
        async getUsuario(obj, {id}){
            const usuario = await Usuario.findById(id);
            return usuario;
        }       
    },
    Mutation:{

        //Agregar usuarios
        async addUsuario(obj, { input }){
            const usuario = new Usuario(input);
            await usuario.save();
            return usuario;
        },

        //Update Usuarios
        async updateUsuario(obj, {id, input}){
            const usuario = await usuario.findByIdAndUpdate(id, input);
            return usuario;
        },


        //Eliminar usuarios
        async deleteUsuario(obj, {id}){
            await Usuario.deleteOne({_id:id});
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


        // Eventos

        async addEvento(obj, { input }){
              const evento = new Evento(input);
              await evento.save();
              return evento;
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
async function startServer(){
    const apolloServer = new ApolloServer({typeDefs,resolvers,corsOptions});
    await apolloServer.start();

    apolloServer.applyMiddleware({ app, cors:false});

}



startServer();
const app = express();

app.use(cors());
app.listen(8090, function(){
    console.log("servidor Iniciado!!")
})

