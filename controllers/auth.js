import { request, response } from "express";
import { User } from "../models/index.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../helpers/generar-jwt.js";
import { googleVerify } from "../helpers/google-verify.js";

const login = async (req, res = response) => {

    const { correo, password } = req.body;
    try {
        // Verificar si el email existe
        const user = await User.findOne({ correo });
        if( !user ) {
            return res.status(400).json({
                msg: "WRONG User or password - email"
            });
        }

        // Si el usuario está activo
        if( !user.estado ) {
            return res.status(400).json({
                msg: "WRONG User or password - estado: false"
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword ){
            return res.status(400).json({
                msg: "WRONG User or password - password"
            });
        }

        // Generar JWT
        const token = await generarJWT( user.id );

        res.json({
            user,
            token
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            msg: 'Something went wrong, please contact support'
        });
    }
}



const googleSignIn = async( req = request, res = response ) => {

    const { id_token } = req.body;

    try {

        const { nombre, correo, img } = await googleVerify( id_token );
        
        let user = await User.findOne({ correo });

        if ( !user ) {
            // Create user
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true
            }

            user = new User( data );
            await user.save();
        }

        // verify user "estado" in DB
        if ( !user.estado ) {
            return res.status(401).json({
                msg: 'User is not active, please contact support team'
            });
        }

        // Generar JWT
        const token = await generarJWT( user.id );
        
        res.json({
            user,
            id_token
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: 'Google Token could not be verified'
        })
    }


}


export {
    login,
    googleSignIn
}