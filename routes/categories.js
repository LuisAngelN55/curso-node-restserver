import { Router } from "express";
import { check } from "express-validator";

// import { validateFields, validateJWT } from "../middlewares/index.js";

import { validateJWT, validateFields, isAdminRole } from "../middlewares/index.js";
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "../controllers/categories.js";
import { categoryExistsById } from "../helpers/db-validators.js";

const routerCategories = Router();


// * Get all categories ---- Public
routerCategories.get('/', getCategories);


// * Get one category by Id ---- Public
routerCategories.get('/:id', [
    check('id', 'It is not a valid Mongo Id').isMongoId(),
    check('id').custom( categoryExistsById ),
    validateFields
], getCategoryById);


// * Create category ---- Private: any user valid JWT
routerCategories.post('/', [
    validateJWT, //currentUser is added in this validation
    check( 'name', 'Name is required').not().isEmpty(), 
    validateFields,
], createCategory );


// * Update category ---- Private: any user valid JWT
routerCategories.put('/:id', [
    validateJWT,
    check( 'name', 'Name is required').not().isEmpty(),
    check('id').custom( categoryExistsById ), 
    validateFields
], updateCategory);



// * Delete category ---- Private: Admin User valid JWT
routerCategories.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id').custom( categoryExistsById ),
    validateFields
],deleteCategory);


export default routerCategories;