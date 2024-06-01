import express from "express";
import registerController from '../controllers/register-controller';
const validatorRegister = require('../middleware/validator-register');
const router = express.Router();


router.post('/', validatorRegister.validatorParams, validatorRegister.validator ,registerController);


export default router;