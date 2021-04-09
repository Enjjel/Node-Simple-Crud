const User = require('../models/model_user')
const bcrypt = require('bcryptjs')
const authController = []
const generateJWT = require('../helpers/generateJWT')
const { googleVerify } = require('../helpers/google-verify')
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

authController.googleSignIn = async (req = request, res = response) => {
    
    const { id_token } = req.body

    try {
        const {name, email, img} = await googleVerify(id_token)

        let user = await User.findOne({ email })

        if (!user) {
            user = new User({
                name,
                email,
                password: 'pass',
                img,
                google: true
            })

            await user.save()
        }

        if (!user.status) {
            res.status(401).json({
                msg: "Send a message to the admin"
            })
        }

        const token = await generateJWT(user.id)

        res.json({
            user,
            token
        })
    } catch (error) {
        res.status(400).json({msg: "there is a problem"})
    }

}


module.exports = authController