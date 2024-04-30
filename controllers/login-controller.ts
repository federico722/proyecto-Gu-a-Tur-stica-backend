const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require('../config/config-db.js');
import loginRepository from "../repositories/loginRepository";
import Login from "../Dto/loginDto";
import { Request, Response } from "express";

const secretKey = "HCA19";

let auth = async (req: Request, res: Response) => {
      try {
        const {email, password} = req.body;
        const result: any = await loginRepository.login(new Login(email));

        if (result[0].length > 0){
          const isPasswordValid = await bcrypt.compare(password, result[0][0].password);
          const userData  =result[0][0];
          if (isPasswordValid){
            const token = jwt.sign({ email:userData.email}, secretKey, {expiresIn: "24h"});
            return res.status(200).json({ 
              status: 'Successful login',
              token: token
            });
          }
        }
        return res.status(401).json({ 
          status: 'Incorrect username or password'
        });
      } catch (error) {
        console.log(error);
      }

      
}


export default auth;