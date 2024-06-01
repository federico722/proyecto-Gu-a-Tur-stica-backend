import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
const secred_key = 'HTG5W'


let verifiToken = async  (req: Request, res: Response) =>{
    const authHeader = req.header('Authorization');
    if (! authHeader) {
        return res.status(401).json({ message: " Authorization header missing "})   
    }

    const token = authHeader.split('')[1];
    if (! token) {
        return res.status(401).json({ message: "Token missing"});
    }

    try {
        const decoded = await verifyToken(token);
        res.status(200).json({ message: 'Token verificado exitosamente', decoded });
    } catch (err) {
        res.status(401).json({ message: 'Error al verificar el token', error: err });
    }

};

let verifyToken = (Token: any) =>{

    return new Promise((resolve, reject) => {
        jwt.verify(Token, secred_key, (err: any, decoded: any) => {
            if (err) {
                console.log('Error al verificar el token:', err);
                reject(err);
                
            } else {
                console.log('Token verificado exitosamente:', decoded);
                resolve(decoded);
            }
        });
    });

};
export default verifiToken;
export {secred_key};