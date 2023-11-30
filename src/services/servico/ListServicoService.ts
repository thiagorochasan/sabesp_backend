import prismaClient from "../../prisma";

class ListServicoService{

    async execute(){
        const servico = await prismaClient.servico.findMany({
            select:{
                id: true,
                nome: true,
                endereco: true,
                contato: true
            }
        })

        return servico;
    }
}

export {ListServicoService}