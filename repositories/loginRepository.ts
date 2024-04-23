import db from '../config/config-db';
import Login from '../Dto/loginDto';

class loginRepository{
    
    static async login(login:Login){
        const sql = 'SELECT password FROM users WHERE email= ?';
        const values = [login.email];
        return db.execute(sql , values)
    }
}

export default loginRepository;