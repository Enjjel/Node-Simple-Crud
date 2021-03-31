require('dotenv').config()

const Server = require('./models/model_server.js')


const server = new Server()


server.listen()
