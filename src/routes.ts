import {Router, Request, Response} from 'express';

const router = Router();




import { CreateServicoController } from './controllers/servico/CreateServicoController';
import { ListServicoController } from './controllers/servico/ListServicoController';
import { EnvioServicoController } from './controllers/comunicacao/WhatsappController'





router.post('/servico', new CreateServicoController().handle)
router.get('/servico',  new ListServicoController().handle)
router.post('/envioservico', new EnvioServicoController().handle)




export { router };