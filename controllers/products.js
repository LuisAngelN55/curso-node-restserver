import { request, response } from "express";
import { Product } from "../models/index.js";




const createProduct = async ( req = request, res = response ) => {

    const name = req.body.name.toUpperCase();
    const { category } = req.body;
    const productDB = await Product.findOne({ name });

    if ( productDB ) {
        return res.status(400).json({
            msg: `Product ${ productDB.name } already exists`
        })
    }

    // Generate the data that will be saved
    const data = {
        name,
        category,
        user: req.currentUser._id
    }

    const  product = new Product( data );

    // Save in DB
    await product.save();

    res.status(201).json( product )
}


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



const getProductById = async ( req = request, res = response ) => {

    const { id } = req.params;

    const product = await Product.findById(id).populate('user', 'nombre').populate('category', 'name');

    res.status(200).json(product)
}



export {
    createProduct,
    getProducts,
    getProductById
}