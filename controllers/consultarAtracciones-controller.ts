import { Request, Response } from "express";
import VerifyToken from "../Helpers/verifyToken";
import consultarAtraccionesRepository from "../repositories/consultarAtraccionesRepository";
import Consultar from "../Dto/consultarAtraccionesDto";


let consultarAtraccionesTuristicas = async (req: Request, res: Response) =>{
    try {
        const municipio = req.query.municipio;
        console.log(req.body);
        
        console.log(VerifyToken());
        const result = await consultarAtraccionesRepository.consultar(new Consultar(municipio))
        console.log(result);

        const resultado: any = result;

        const formattedResult: any = resultado.map((item: { atracciones_turisticas: any; }[]) => item.map((row: { atracciones_turisticas: any; }) => row.atracciones_turisticas));
        
        return res.status(201).send({
            status: "consulta exitosa",
            result: formattedResult,
        })
    } catch (error: any) {
        if (error && error.code == "ER_DUP_ENTRY") {
            return res.status(500).send({ errorInfo: error.sqlMessage }
            );
        }else if(error){
            console.error(error);
            return res.status(500).send({ errorInfo: "Error interno del servidor" });
        }
    }
}

export default consultarAtraccionesTuristicas;


