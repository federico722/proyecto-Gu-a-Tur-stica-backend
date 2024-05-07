import jwt from 'jsonwebtoken';
import { secret_key, Token } from '../controllers/login-controller';

let verifyToken = () =>{

    return new Promise((resolve, reject) => {
        jwt.verify(Token, secret_key, (err: any, decoded: any) => {
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
export default verifyToken;