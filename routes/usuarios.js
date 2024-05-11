import { Router } from "express";
import { check } from "express-validator";

import { validateFields, validateJWT, isAdminRole, hasRole } from "../middlewares/index.js";

import { emailExists, isRoleValid, userExistsById } from "../helpers/db-validators.js";
import { usuariosDelete, usuariosGet, usuariosPatch, usuariosPost, usuariosPut } from "../controllers/usuarios.js";


const router = Router();

router.get('/', usuariosGet );

router.put('/:id', [
    check( 'id', 'No es un ID válido').isMongoId(),
    check('id').custom( userExistsById ),
    check('rol').custom( isRoleValid ),
    validateFields
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe der mayor a 6 caracteres').isLength({ min: 6}),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailExists ),
    // check('rol', 'No es un rol válido').isIn([ 'ADMIN_ROLE', 'USER_ROLE' ]),
    check('rol').custom( isRoleValid ),
    validateFields
]
,usuariosPost);

router.delete('/:id', [
    validateJWT,
    // isAdminRole,
    hasRole( 'ADMIN_ROLE', 'VENTAS_ROLE' ),
    check( 'id', 'ID is not valid').isMongoId(),
    check('id').custom( userExistsById ),
    validateFields
],usuariosDelete);

router.patch('/', usuariosPatch);


export {
    router
}