import db from '../config/config-db';
import Consultar from  '../Dto/consultarAtraccionesDto';

class consultarAtraccionesRepository{
    static async consultar(consultar: Consultar){
        const sql= "SELECT atracciones_turisticas from directorioColombia where municipio = ? order by RAND() limit 1";
        const values= [consultar.municipio];
        return db.execute(sql, values)
    }
}

export default consultarAtraccionesRepository;