import { Request, Response} from 'express'
import {CreateServicoService} from '../../services/servico/CreateServicoService'
import { EnvioServicoService } from '../../services/comunicacao/WhatsappService';
import { strictTransportSecurity } from 'helmet';

interface WhatsappRequest{
    phone: string;
    message: string;
}

class CreateServicoController{
    async handle(req: Request, res: Response){
        
        const  {nome, endereco, contato} = req.body;

        var message = `Serviço: ${nome} \n Endereço: ${endereco}`;
        var phone = contato;

        if(phone.substring(0,2) != "55"){
            phone = `55${phone}`
        }

        const envioServicoService = new EnvioServicoService();

        const envio = await envioServicoService.execute({
            phone: phone,
            message: message,
        });


        const createServicoService = new CreateServicoService();

        const servico = await createServicoService.execute({
            nome,
            endereco,
            contato
        });

        return  res.json(servico);
    }
}

export {CreateServicoController}