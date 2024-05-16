import { Router } from "express";
import { check } from "express-validator";

import { googleSignIn, login } from "../controllers/auth.js";
import { validateFields } from "../middlewares/validate-fields.js";


const routerAuth = Router();

routerAuth.post('/login', [
    check('correo', 'E-mail is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
],login );


routerAuth.post('/google', [
    check('id_token', 'Google token is required').not().isEmpty(),
    validateFields
], googleSignIn );



export default routerAuth;