
import Register from "../Dto/registerDto";
import generateHash from "../Helpers/generateHash";
import Login from "../Dto/loginDto";
import registerRepository from "../repositories/registerRepository";

class RegisterService{
    static async register(register: Register){
        register.contrasenia = await generateHash(register.contrasenia);
        return await registerRepository.add(register);
    }
/*
    static async login(login: Login){
        return await registerRepository.login()
    }
*/
}
