const jwt = require('jsonwebtoken')
const { response, request } = require('express')
const User = require('../models/model_user')


const validateJWT  = async (req = request, res = response, next) => {
    const token = req.header('x-token')

    if (!token)
    {
        return res.status(401).json({
            message: 'there is not token'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWTKEY)

        //find the user's respective token
        const user = await User.findById(uid)

        //verify user's existence

        if (!user)
        {
            return res.status(401).json({
                message: 'user not exists in database'
            })
        }

        //verify user status
        if (!user.status)
        {
            return res.status(401).json({
                message: 'user status false'
            })
        }

        // add the user to request
        req.user = user

        next()
    } catch (error) {
        return res.status(401).json({
            message: 'invalid token'
        })
    }
}


module.exports = {validateJWT}