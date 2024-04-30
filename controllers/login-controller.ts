import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import loginRepository from "../repositories/loginRepository";
import Login from "../Dto/loginDto";
import { Request, Response } from "express";

const secretKey = "hjgk"; 

const auth = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result: any = await loginRepository.login(new Login(email));

    
    if (result[0].length > 0) {
      const userData = result[0][0];

  
      const isPasswordValid = await bcrypt.compare(password, userData.password);

      if (isPasswordValid) {
  
        const token = jwt.sign({ email: userData.email }, secretKey, { expiresIn: "1h" });

        
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
    return res.status(500).json({ 
      status: 'Internal Server Error'
    });
  }
}

export default auth;
