import db from '../config/config-db';
import Register from '../Dto/registerDto';

class registerRepository{

    static async add(register:Register){
        const sql = 'INSERT INTO register(nombre,apellido,telefono,email,password) VALUES ( ? , ? , ? , ? , ? , ? )';
        const result = [register.nombre, register.apellido, register.edad, register.telefono, register.email, register.password];
        return db.execute(sql,result);
    }
}

export default registerRepository;