import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import { AuthType, Infobip } from '@infobip-api/sdk';
import { Request, Response} from 'express'

dotenv.config();
const app = express();
app.use(helmet());
app.use(express.json());


class EnvioServicoController{
    async handle(req: Request, res: Response){

        const { phone, message, servico, endereco, contato } = req.body;

        // console.log(phone);
        // console.log(message);

        // console.log(servico);
        // console.log(endereco);
        // console.log(contato);

        const client = new Infobip({
            baseUrl: process.env.INFOBIP_BASE_URL!,
            apiKey: process.env.INFOBIP_API_KEY!,
            authType: AuthType.ApiKey
        });

        const messageConfig = {
            type: 'text',
            from: process.env.INFOBIP_SENDER_PHONE!,
            to: phone,
            content: {
                text: message
            }
        };

        try {
            const result = await client.channels.whatsapp.send(messageConfig);
		    //console.log(result);
		    res.json({ sucess: true, data: result.data });

        } catch (error) {

            console.error(error);

		    res.status(500).json({ sucess: false, error });
            
        }
    }
}

export {EnvioServicoController}