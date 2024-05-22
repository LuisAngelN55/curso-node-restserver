import { request, response } from "express";
import { Product } from "../models/index.js";



//* ------------------------- POST - CREATE Product --------------------- *//
const createProduct = async ( req = request, res = response ) => {

    const { name, status, user, ...body } = req.body;
    const productDB = await Product.findOne({ name });

    if ( productDB ) {
        return res.status(400).json({
            msg: `Product ${ productDB.name } already exists`
        })
    }

    // Generate the data that will be saved
    const data = {
        ...body,
        name: name.toUpperCase(),
        user: req.currentUser._id
    }

    const  product = new Product( data );

    // Save in DB
    await product.save();

    res.status(201).json( product )
}


//* ------------------------- GET ALL Products --------------------- *//
const getProducts = async ( req = request, res = response ) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { status: true }

    const [ total, products ] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate( 'user', 'nombre' )
            .populate( 'category', 'name' )
            .skip( Number( from ) )
            .limit( Number( limit ) )
    ])

    res.json({
        msg: 'get API - Controlador',
        total,
        products: products
    });
}


//* ------------------------- GET BY ID Product --------------------- *//
const getProductById = async ( req = request, res = response ) => {

    const { id } = req.params;

    const product = await Product.findById(id).populate('user', 'nombre').populate('category', 'name');

    res.status(200).json(product)
}



//* ------------------------- PUT - UPDATE Product --------------------- *//
const updateProduct = async ( req = request, res = response ) =>{

    const { id } = req.params;
    const { user, ...data } = req.body;

    if ( data.name ) {
        data.name = data.name.toUpperCase();
    }
    data.user = req.currentUser._id;

    const productDB = await Product.findOne({ name: data.name });

    if ( productDB ) {
        return res.status(400).json({
            msg: `Product ${ productDB.name } already exists`
        })  
    }

    const product = await Product.findByIdAndUpdate( id, data, { new: true} );

    res.json({
        msg: 'put API - Controlador',
        product
    })

}



//* ------------------------- DELETE Product --------------------- *//
const deleteProduct = async (req, res) => {

    const { id } = req.params;

    const product = await Product.findByIdAndUpdate( id, { status: false }, { new: true})

    res.json({
        msg: 'delete API - Controlador',
        product
    })

}


export {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}