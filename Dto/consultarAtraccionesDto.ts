class consultar{
    private _municipio: any;
    constructor(
        municipio: any,
    ){
        this._municipio=municipio;
    }

    // Getters
    get municipio(): any{
        return this._municipio;
    }

    // Setters
    set municipio(municipio: any){
        this._municipio = municipio;
    }
}

export default consultar;