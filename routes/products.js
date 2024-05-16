import { Router } from "express";
import { check } from "express-validator";

// import { validateFields, validateJWT } from "../middlewares/index.js";

import { validateJWT, validateFields, isAdminRole } from "../middlewares/index.js";
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "../controllers/categories.js";
import { categoryExistsById } from "../helpers/db-validators.js";

const routerProducts = Router();






export default routerProducts;