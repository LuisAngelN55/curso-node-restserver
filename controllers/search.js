import { request, response } from "express";
import { Types } from "mongoose";
import User from "../models/user.js";


const availableCollectinos = [
    'users',
    'categories',
    'products',
    'roles'
]


const searchUsers = async ( term = '', res = response ) => {
    
    const isMongoID = Types.ObjectId.isValid( term );
    console.log({isMongoID})

    if ( isMongoID ) {
        const user = await User.findById( term );

        res.json({
            results: ( user ) ? [ user ] : []
        })
    }

}


const search = async ( req = request, res = response ) => {

    const { collection, term } = req.params;

    if( !availableCollectinos.includes( collection) ) {
        return res.status(400).json({
            msg: `Available collections are: ${ availableCollectinos }`
        })
    }

    switch (collection) {
        case 'users':
            searchUsers(term, res)
        break;

        case 'categories':

        break;

        case 'products':
            
        break;

        default:
            res.status(500).json({
                msg: 'Forgotten to do add collection for searching'
            })
    
    }

}

export {
    search
}