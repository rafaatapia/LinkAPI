import IOrderProvider from '../models/IOrderProvider';

import IResponseCreateOrderDTO from '../dtos/IResponseCreateOrderDTO';

class FakeOrderProvider implements IOrderProvider {
  public async createOrder(): Promise<IResponseCreateOrderDTO> {
    return {
      retorno: {
        pedidos: [
          {
            numero: '1',
            idPedido: 1,
            volumes: [{ servico: 'Teste' }],
            codigos_rastreamento: { codigo_rastreamento: '123' },
          },
        ],
      },
    } as IResponseCreateOrderDTO;
  }
}

export default FakeOrderProvider;
