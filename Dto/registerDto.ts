class register{
    nombre: string;
    apellido: string;
    edad: string;
    telefono: string;
    email: string;
    password: string;
    constructor(
        nombre: string,apellido: string, edad: string,
        telefono: string, email: string,
        password: string
    ){
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.telefono = telefono;
        this.email = email;
        this.password = password;
    }

}
export default register;