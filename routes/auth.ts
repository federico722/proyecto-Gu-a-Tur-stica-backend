import express from "express";
import authController from '../controllers/auth-controller';
import verifiToken from "../middleware/verifyToken";
const validatorAuth = require('../middleware/auth-validator');
const router = express.Router();


router.post('/',validatorAuth.validatorParams, validatorAuth.validator ,verifiToken, authController);


export default router;
