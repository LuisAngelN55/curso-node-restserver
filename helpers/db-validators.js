import Role from '../models/role.js'
import User from '../models/user.js'

const isRoleValid = async (rol = '') => {
    const exists = await Role.findOne( { rol });
    if( !exists ) {
        throw new Error(`Role ${ rol }, is not valid or does not exists`)
    }
}

const emailExists = async ( email= '' ) => {
    // Verificar si el correo existe
    const exists = await User.findOne({ correo: email });
    if( exists ) {
        throw new Error(`The email ${ email } is already registered`)
    }
}


const userExistsById = async ( id ) => {

    // Verificar si el correo existe
    const exists = await User.findById( id );
    if( !exists ) {
        throw new Error(`ID: ${ id }, is not valid or does not exists`)
    }
}

export {
    isRoleValid,
    emailExists,
    userExistsById
}