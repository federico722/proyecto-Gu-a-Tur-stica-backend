import db from '../config/config-db';
import User from '../Dto/userDto';

class userRepository{

    static async add(user:User){
        const sql = 'INSERT INTO users (email, nombres, apellidos, telefono, password) VALUES (?, ?, ?, ?, ?)';
        const values = [user.email, user.nombres, user.apellidos, user.telefono, user.password];
        return db.execute(sql, values);
    }
}



export default userRepository;