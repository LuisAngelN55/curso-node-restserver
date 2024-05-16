import { response, request } from "express";
import User from "../models/user.js";
import bcryptjs from "bcryptjs";


//* ------------------------- GET USUARIOS --------------------- *//
const usuariosGet = async (req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { estado: true }

    // const users = await User.find(query)
    //                         .skip( Number( from ) )
    //                         .limit( Number( limit ) );

    // const total = await User.countDocuments(query);


    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip( Number( from ) )
            .limit( Number( limit ) )
    ])

    res.json({
        msg: 'get API - Controlador',
        total,
        users
    })
}


//* ------------------------- PUT USUARIOS --------------------- *//
const usuariosPut = async (req, res) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // TODO Validar contra DB

    if( password ) {
        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt )
    }

    const user = await User.findByIdAndUpdate( id, resto );

    res.json({
        msg: 'put API - Controlador',
        user
    })
}


//* ------------------------- POST USUARIOS --------------------- *//
const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new User({ nombre, correo, password, rol});

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt )
    
    // Guardar en DB
    await usuario.save();

    res.status(201).json({
        msg: 'post API - Controlador',
        usuario,
    })
}


//* ------------------------- DELETE USUARIOS --------------------- *//
const usuariosDelete = async (req, res) => {

    const { id } = req.params;

    // DELETED PHISICALLY FROM DB
    // const user = await User.findByIdAndDelete( id );

    const user = await User.findByIdAndUpdate( id, { estado: false })

    res.json({
        msg: 'delete API - Controlador',
        user
    })

}



//* ------------------------- PATCH USUARIOS --------------------- *//
const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch API - Controlador'
    })
}


export {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}