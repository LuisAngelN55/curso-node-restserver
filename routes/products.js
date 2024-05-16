import { Router } from "express";
import { check } from "express-validator";

import { validateJWT, validateFields, isAdminRole } from "../middlewares/index.js";
import { createProduct, getProductById, getProducts } from "../controllers/products.js";
import { categoryExistsById, productExistsById } from "../helpers/db-validators.js";

const routerProducts = Router();

// * Create Product ---- Private: any user valid JWT
routerProducts.post('/',[
    validateJWT, //currentUser is added in this validation
    check( 'name', 'Name is required').not().isEmpty(), 
    check('category').custom( categoryExistsById ),
    validateFields,
], createProduct )


// * Get all products ---- Public
routerProducts.get('/', getProducts);



// * Get one category by Id ---- Public
routerProducts.get('/:id', [
    check('id', 'It is not a valid Mongo Id').isMongoId(),
    check('id').custom( productExistsById ),
    validateFields
], getProductById);



export default routerProducts;