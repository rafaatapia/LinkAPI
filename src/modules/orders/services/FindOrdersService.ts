import { injectable, inject } from 'tsyringe';

import Order from '../infra/typeorm/schemas/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IRequest {
  id?: string;
}

@injectable()
class FindOrdersService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Order[] | Order | undefined> {
    if (id) {
      return this.ordersRepository.findById(id);
    }

    return this.ordersRepository.findAll();
  }
}

export default FindOrdersService;
