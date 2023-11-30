import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import { AuthType, Infobip } from '@infobip-api/sdk';


dotenv.config();
const app = express();
app.use(helmet());
app.use(express.json());

interface WhatsappRequest{
    phone: string;
    message: string;
}

class EnvioServicoService{
    async execute({phone, message} : WhatsappRequest){

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
		    console.log(result);
            
        } catch (error) {

            console.error(error);
        }


    }

}

export {EnvioServicoService}