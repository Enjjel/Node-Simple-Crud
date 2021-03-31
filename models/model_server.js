const express = require('express')
const cors = require('cors')
const { db_connection } = require('../database/config')

class Server
{
    constructor()
    {
        this.app = express()
        this.port = process.env.PORT
        this.usersPath = '/users'
        this.authPath = '/auth'

        this.dbConnection()
        this.middleWares()
        this.routes()
    }

    async dbConnection() 
    {
        await db_connection()
    }

    middleWares()
    {
        this.app.use(cors())

        this.app.use(express.json())

        this.app.use(express.static('public'))
    }

    routes()
    {
        this.app.use(this.authPath, require('../routes/auth.route'))
        this.app.use(this.usersPath, require('../routes/user.route'))
    }

    listen()
    {
        this.app.listen(process.env.PORT, () => {
            console.log(`Listening on PORT ${process.env.PORT}`);
        })
    }
}

module.exports = Server