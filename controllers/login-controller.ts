
const bcrypt = require("bcryptjs");
const db = require('../config/config-db.js');
import loginRepository from "../repositories/loginRepository";
import Login from "../Dto/loginDto";
import { Request, Response } from "express";
import generateToken from "../Helpers/generateToken";
const secret_key = 'HGT5W';
let Token= generateToken({id: 12},secret_key, 5)

let auth = async (req: Request, res: Response) => {
      try {
        const {email, contrasenia} = req.body;
        console.log(req.body);
        
        const result: any = await loginRepository.login(new Login(email));
        console.log(result);
        

        if (result[0].length > 0){
          const isPasswordValid = await bcrypt.compare(contrasenia, result[0][0].contrasenia);
          if (isPasswordValid) {
            return res.status(200).json({
              status: 'Successful authentication',
              token:Token,
              result: result.status,
            })
          }else{
            return res.status(401).json({ 
              status: 'Incorrect username or password'
            });
          };
        }else{
          return res.status(404).json({
            status:'User not found'
          });
        }
      } catch (error: any) {
        if (error && error.code === "ER_DUP_ENTRY") {
          return res.status(500).send({ errorInfo: error.sqlMessage });
        } else if(error){
          return console.error(error);
          ;
        }
      }
    };


export default auth;
export {secret_key, Token};