import bcrypt from 'bcryptjs';
import registerRepository from '../repositories/registerRepository';
import Register from '../Dto/registerDto';
import { Request, Response } from "express";



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
    
    return res.status(201).send(
      { status: 'register ok', password_hasheado: hashedPassword }
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