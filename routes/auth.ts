import express from "express";
import authController from '../controllers/login-controller';
const router = express.Router();


router.post('/', authController);


export default router;
