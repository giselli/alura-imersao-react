import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {
    if(request.method === 'POST') {
        const TOKEN = 'b4d37937e4b2eebb899af576b3cb46';
        const client = new SiteClient(TOKEN);
        
       
        const registroCriado = await client.items.create({
            itemType: "968413",
            //model id do Community do alurakut no datocms
            ...request.body,
        })
    
        console.log(registroCriado);
    
        response.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado,
        })
        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
}
