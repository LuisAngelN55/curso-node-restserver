import { response, request } from "express";

const usuariosGet = (req = request, res = response) => {

    const { nombre= 'No name', pagina= 1, limit= 10 } = req.query;
    res.json({
        msg: 'get API - Controlador',
        nombre,
        pagina
    })
}


const usuariosPut = (req, res) => {

    const { id } = req.params;

    res.status(500).json({
        msg: 'put API - Controlador',
        id
    })
}

const usuariosPost = (req, res) => {


    const { nombre, edad } = req.body;


    res.status(201).json({
        msg: 'post API - Controlador',
        nombre,
        edad
    })
}
const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete API - Controlador'
    })
}
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