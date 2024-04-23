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
      password,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await registerRepository.add(new Register(nombre, apellido, edad, telefono, email, hashedPassword));
    return res.status(201).send(
      { status: 'register ok', password_hasheado: hashedPassword }
    );
  } catch (error: any) {
    if (error && error.code == "ER_DUP_ENTRY") {
      return res.status(500).send({ errorInfo: error.sqlMessage }
      );
    }
  }
}


export default register;