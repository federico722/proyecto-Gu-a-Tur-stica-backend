import db from '../config/config-db';
import Register from '../Dto/registerDto';

class registerRepository{

    static async add(register:Register){
        const sql = 'INSERT INTO register(nombre,apellido,edad,telefono,email,contrasenia) VALUES ( ? , ? , ? , ? , ? , ? )';
        const result = [register.nombre, register.apellido, register.edad, register.telefono, register.email, register.contrasenia];
        return db.execute(sql,result);
    }
}

export default registerRepository;