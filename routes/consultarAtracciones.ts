import Express  from "express";
import consultarTurismo from "../controllers/consultarAtracciones-controller";
const router = Express.Router();

router.get('/',consultarTurismo);

export default router;