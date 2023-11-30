import prismaClient from "../../prisma";

interface ServicoRequest{
    nome: string;
    endereco: string;
    contato:string;
}

class CreateServicoService{
    async execute({nome, endereco, contato} : ServicoRequest){

        const servico = await prismaClient.servico.create({
            data:{
                nome:nome,
                endereco:endereco,
                contato:contato
            }
        })
        
        return servico;
    }

}

export {CreateServicoService}