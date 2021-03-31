const User = require('../models/model_user')
const bcrypt = require('bcryptjs')
const authController = []
const generateJWT = require('../helpers/generateJWT')
const { response, request } = require('express')

authController.loginValidation = async (req = request, res = response) => 
{
    const {email, password} = req.body

    try 
    {
        const user = await User.findOne({email})

        //exists a user
        if (!user)
        {
            return res.status(400).json({
                message: 'User / Password is incorrect'
            })
        }

        //the user is active

        if (!user.status)
        {
            return res.status(400).json(
                {
                    message: 'The user not exists in the database'
                }
            )
        }

        //password validation

        const validPassword = bcrypt.compareSync(password, user.password)

        if (!validPassword)
        {
            return res.status(400).json(
                {
                    message: 'incorrect password'
                }
            )
        }

        //generate JWT

        const token = await generateJWT(user.id)

        res.json(
            {
                user,
                token
            }
        )
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).json({
            message: 'Please, contact the administrator'
        })
    }
}


module.exports = authController