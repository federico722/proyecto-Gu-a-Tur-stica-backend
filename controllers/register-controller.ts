import bcrypt from 'bcryptjs';
import registerRepository from '../repositories/registerRepository';
import Register from '../Dto/registerDto';
import generateToken from "../Helpers/generateToken";
import { Request, Response } from "express";
import { secred_key } from '../middleware/verifyToken';

let Token: any;


let register = async (req: Request, res: Response) => {
  try {
    const {
      nombre,
      apellido,
      edad,
      telefono,
      email,
      contrasenia,
    } = req.body;

    console.log(req.body);
    

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contrasenia, salt);
    console.log(contrasenia);
    
    const result = await registerRepository.add(new Register(nombre, apellido, edad, telefono, email, hashedPassword));
    console.log(result);

    Token= generateToken({email: email},secred_key, 5)

    
    return res.status(201).json(
      { status: 'register ok', password_hasheado: hashedPassword , token: Token}
    );
  } catch (error: any) {
    if (error && error.code == "ER_DUP_ENTRY") {
      return res.status(500).send({ errorInfo: error.sqlMessage }
      );
    }else if(error){
      return console.error(error)
    }
  }
}


export default register;
