import { request, response } from "express";
import { Types } from "mongoose";
import { User, Category, Product } from "../models/index.js";


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

    const regex = new RegExp( term, 'i');

    const users = await User.find({
        $or: [{nombre: regex}, { correo: regex}],
        $and: [{ estado: true }]
    });

    res.json({
        results: users
    })

}


const searchCategories = async ( term = '', res = response ) => {
    
    const isMongoID = Types.ObjectId.isValid( term );
    console.log({isMongoID})

    if ( isMongoID ) {
        const category = await User.findById( term );

        res.json({
            results: ( category ) ? [ category ] : []
        })
    }

    const regex = new RegExp( term, 'i');

    const categories = await Category.find({
        $or: [{name: regex}],
        $and: [{ status: true }]
    });

    res.json({
        results: categories
    })

}


const searchProducts = async ( term = '', res = response ) => {
    
    const isMongoID = Types.ObjectId.isValid( term );

    if ( isMongoID ) {
        const product = await User.findById( term );

        res.json({
            results: ( product ) ? [ product ] : []
        })
    }

    const regex = new RegExp( term, 'i');

    const products = await Product.find({
        $or: [{name: regex}],
        $and: [{ status: true }]
    });

    res.json({
        results: products
    })

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
            searchUsers(term, res);
            break;
            
        case 'categories':
            searchCategories(term, res);
            break;
            
        case 'products':
            searchProducts(term, res);
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