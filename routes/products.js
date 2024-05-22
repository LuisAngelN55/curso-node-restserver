import { Router } from "express";
import { check } from "express-validator";

import { validateJWT, validateFields, isAdminRole } from "../middlewares/index.js";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/products.js";
import { categoryExistsById, productExistsById } from "../helpers/db-validators.js";

const routerProducts = Router();

// * Create Product ---- Private: any user valid JWT
routerProducts.post('/',[
    validateJWT, //currentUser is added in this validation
    check( 'name', 'Name is required').not().isEmpty(), 
    check('category', 'Category ID is not a valid Mongo Id').isMongoId(),
    check('category').custom( categoryExistsById ),
    validateFields,
], createProduct )


// * Get all products ---- Public
routerProducts.get('/', getProducts);



// * Get one product by Id ---- Public
routerProducts.get('/:id', [
    check('id', 'It is not a valid Mongo Id').isMongoId(),
    check('id').custom( productExistsById ),
    validateFields
], getProductById);



// * Update product ---- Private: any user valid JWT
routerProducts.put('/:id', [
    validateJWT,
    check('id', 'It is not a valid Mongo Id').isMongoId(),
    check('id').custom( productExistsById ),
    validateFields
], updateProduct);



// * Delete product ---- Private: Admin User valid JWT
routerProducts.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'It is not a valid Mongo Id').isMongoId(),
    check('id').custom( productExistsById ),
    validateFields
], deleteProduct);

export default routerProducts;