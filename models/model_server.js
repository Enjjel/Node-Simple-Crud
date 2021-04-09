const express = require('express')
const cors = require('cors')
const { db_connection } = require('../database/config')

class Server
{
    constructor()
    {
        this.app = express()
        this.port = process.env.PORT
        this.path = {
            users:      '/users',
            auth:       '/auth',
            categories: '/categories',
            products:   '/products',
            browser:    '/browser'
        }

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
        this.app.use(this.path.auth,        require('../routes/auth.route'))
        this.app.use(this.path.categories,  require('../routes/categories.route'))
        this.app.use(this.path.users,       require('../routes/user.route'))
        this.app.use(this.path.products,    require('../routes/product.route'))
        this.app.use(this.path.browser,     require('../routes/browser.route'))
    }

    listen()
    {
        this.app.listen(process.env.PORT, () => {
            console.log(`Listening on PORT ${process.env.PORT}`);
        })
    }
}

module.exports = Server