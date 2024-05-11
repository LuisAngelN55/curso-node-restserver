import { request, response } from "express";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

const validateJWT = async ( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: "Token missing in request"
        });
    }

    try {
     
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY ); //Payload

        // Get current user, token uid's owner
        const currentUser = await User.findById( uid );

        if ( !currentUser ) {
            return res.status(401).json({
                msg: 'Invalid user - Does not exists'
            });
        }
        
        // Validate user is active by field "estado"
        if ( !currentUser.estado ) {
            return res.status(401).json({
                msg: 'Invalid user - estado'
            });
        }
            
        req.currentUser = currentUser;
        next(); 
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Invalid Token'
        });
    }
    

}

export {
     validateJWT
}