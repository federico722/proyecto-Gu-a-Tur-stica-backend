const bcrypt = require("bcryptjs");
const db = require('../config/config-db.js');
import loginRepository from "../repositories/loginRepository";
import Login from "../Dto/loginDto";
import { Request, Response } from "express";

let auth = async (req: Request, res: Response) => {
      try {
        const {email, password} = req.body;
        const result = await loginRepository.login(new Login(email));
        if (result[0].length > 0){
          const isPasswordValid = await bcrypt.compare(password, result[0][0].password);
          if (isPasswordValid){
            return res.status(200).json({ 
              status: 'Successful login'
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