import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import loginRepository from "../repositories/loginRepository";
import Login from "../Dto/loginDto";
import { Request, Response } from "express";

const secretKey = "tu_clave_secreta"; // Clave secreta para firmar los tokens JWT

const auth = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result: any = await loginRepository.login(new Login(email));

    // Verificar si se encontró un usuario con el email proporcionado
    if (result[0].length > 0) {
      const userData = result[0][0];

      // Verificar si la contraseña proporcionada coincide con la almacenada en la base de datos
      const isPasswordValid = await bcrypt.compare(password, userData.password);

      if (isPasswordValid) {
        // Crear un token JWT
        const token = jwt.sign({ email: userData.email }, secretKey, { expiresIn: "1h" });

        // Devolver el token en la respuesta
        return res.status(200).json({ 
          status: 'Successful login',
          token: token
        });
      }
    }

    // Si el email o la contraseña son incorrectos, devolver un error de autenticación
    return res.status(401).json({ 
      status: 'Incorrect username or password'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ 
      status: 'Internal Server Error'
    });
  }
}

export default auth;
