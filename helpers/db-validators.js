import { Category, Product, Role, User } from '../models/index.js';

const isRoleValid = async (rol = '') => {
    const exists = await Role.findOne( { rol });
    if( !exists ) {
        throw new Error(`Role ${ rol }, is not valid or does not exists`)
    }
}

const emailExists = async ( email= '' ) => {
    // Verify if email exists
    const exists = await User.findOne({ correo: email });
    if( exists ) {
        throw new Error(`The email ${ email } is already registered`)
    }
}


const userExistsById = async ( id ) => {

    // Verify if user exists by id
    const exists = await User.findById( id );
    if( !exists ) {
        throw new Error(`User ID: ${ id }, is not valid or does not exists`)
    }
}


const categoryExistsById = async ( id ) => {

    // Verify if category exists by id
    const exists = await Category.findById( id );
    if( !exists ) {
        throw new Error(`Category ID: ${ id }, is not valid or does not exists`)
    }
}


const productExistsById = async ( id ) => {

    // Verify if category exists by id
    const exists = await Product.findById( id );
    if( !exists ) {
        throw new Error(`Product ID: ${ id }, is not valid or does not exists`)
    }
}


export {
    isRoleValid,
    emailExists,
    userExistsById,
    categoryExistsById,
    productExistsById
}