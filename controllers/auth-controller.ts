
import bcrypt from "bcryptjs";
import loginRepository from "../repositories/loginRepository";
import Login from "../Dto/loginDto";
import { Request, Response } from "express";  




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
              result: result[0].status,
            })
          }
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
