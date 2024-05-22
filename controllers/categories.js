import { request, response } from "express";
import { Category } from "../models/index.js";


//* ------------------------- GET ALL Categories --------------------- *//
const getCategories = async ( req = request, res = response ) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { status: true }

    const [ total, categories ] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .populate( 'user', 'nombre' )
            .skip( Number( from ) )
            .limit( Number( limit ) )
    ])

    res.json({
        msg: 'get API - Controlador',
        total,
        categories
    });
}


//* ------------------------- GET BY ID Category --------------------- *//
const getCategoryById = async ( req = request, res = response ) => {

    const { id } = req.params;

    const category = await Category.findById(id).populate('user', 'nombre');

    res.status(200).json(category)
}


//* ------------------------- CREATE Category --------------------- *//
const createCategory = async ( req = request, res = response ) => {

    const name = req.body.name.toUpperCase();
    const categoryDB = await Category.findOne({ name });

    if ( categoryDB ) {
        return res.status(400).json({
            msg: `Category ${ categoryDB.name } already exists`
        })
    }

    // Generate the data that will be saved
    const data = {
        name,
        user: req.currentUser._id
    }

    const  category = new Category( data );

    // Save in DB
    await category.save();

    res.status(201).json( category )
}


//* ------------------------- UPDATE Category --------------------- *//
const updateCategory = async ( req = request, res = response ) =>{

    const { id } = req.params;
    const { status , user, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.currentUser._id;

    const categoryDB = await Category.findOne({ name: data.name });

    if ( categoryDB ) {
        return res.status(400).json({
            msg: `Category ${ categoryDB.name } already exists`
        })  
    }

    const category = await Category.findByIdAndUpdate( id, data, { new: true} );

    res.json({
        msg: 'put API - Controlador',
        category
    })

}



//* ------------------------- DELETE Category --------------------- *//
const deleteCategory = async (req, res) => {

    const { id } = req.params;

    const category = await Category.findByIdAndUpdate( id, { status: false }, { new: true})

    res.json({
        msg: 'delete API - Controlador',
        category
    })

}


export {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}