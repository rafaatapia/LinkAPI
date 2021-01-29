import { injectable, inject } from 'tsyringe';

import IOrderProvider from '../providers/OrderProvider/models/IOrderProvider';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IOportunity {
  title: string;
  value: number;
  status: string;
  won_time: Date;
  person_name: string;
}

interface IRequest {
  current: IOportunity;
}

@injectable()
class CreateOportunityWonService {
  constructor(
    @inject('OrderProvider')
    private orderProvider: IOrderProvider,

    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({ current }: IRequest): Promise<void> {
    await this.orderProvider.createOrder({
      customer: { nome: current.person_name },
      itens: [
        {
          codigo: '1',
          descricao: current.title,
          qtde: 1,
          vlr_unit: current.value,
        },
      ],
      parcelas: [{ vlr: current.value }],
      volumes: [{ servico: 'Pedido Pipedrive' }],
    });

    const orderDate = new Date(current.won_time);
    const year = orderDate.getFullYear();
    const month = orderDate.getMonth();
    const day = orderDate.getDate();
    const date = new Date(year, month, day);

    await this.ordersRepository.create({
      amount: current.value,
      date,
    });
  }
}

export default CreateOportunityWonService;
