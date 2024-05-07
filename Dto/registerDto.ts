class register{
    
    private _nombre: string;
    private _apellido: string;
    private _edad: string;
    private _telefono: string;
    private _email: string;
    private _contrasenia: string;
    constructor(
        nombre: string, apellido: string, edad: string,
        telefono: string, email: string,
        contrasenia: string
    ){
        this._nombre = nombre;
        this._apellido = apellido;
        this._edad = edad;
        this._telefono = telefono;
        this._email = email;
        this._contrasenia= contrasenia;
    }

     // Getters
    get nombre(): string{
        return this._nombre;
    }

    get apellido(): string{
        return this._apellido;
    }

    get edad(): string{
        return this._edad;
    }

    get telefono(): string{
        return this._telefono;
    }

    get email(): string{
        return this._email;
    }

    get contrasenia(): string{
        return this._contrasenia;
    }

    // Setters
    set nombre(nombre: string){
        this._nombre = nombre;
    }

    set apellido(apellido: string){
        this._apellido = apellido;
    }

    set edad(edad: string){
        this._edad = edad;
    }

    set telefono(telefono: string){
        this._telefono = telefono;
    }

    set email(email: string){
        this._email = email;
    }

    set contrasenia(contrasenia: string){
        this._contrasenia = contrasenia;
    }
}
export default register;