const { response, request } = require('express')

const isAdminRole = (req = request, res = response, next) => {
    if (!req.user)
    {
        return res.status(500).json({
            message: "it is trying to verify the user's without a token"
        })
    }
    
    const {role, name, _id} = req.user


    if (role !== 'ADMIN_ROLE')
    {
        return res.status(401).json({
            name,
            _id,
            message: 'The user is not an admin'
        })
    }

    next()
}

const validRole = (...roles) => {
    return (req = request, res = response, next) => {
        if (!req.user)
        {
            return res.status(500).json({
                message: "it is trying to verify the user's without a token"
            })
        }

        const {role} = req.user

        if (!roles.includes(role))
        {
            return res.status(400).json({
                message: "invalid role"
            })
        }
    }

    next()
}


module.exports = {isAdminRole, validRole}