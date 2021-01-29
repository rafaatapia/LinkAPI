import Order from '../infra/typeorm/schemas/Order';

import ICreateOrderDTO from '../dtos/ICreateOrderDTO';

export default interface IOrdersRepository {
  findAll(): Promise<Order[]>;
  findById(id: string): Promise<Order | undefined>;
  findByDate(date: Date): Promise<Order | undefined>;
  create(data: ICreateOrderDTO): Promise<Order>;
}
