import { getMongoRepository, MongoRepository } from 'typeorm';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';

import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';
import Order from '../schemas/Order';

class OrdersRepository implements IOrdersRepository {
  private ormRepository: MongoRepository<Order>;

  constructor() {
    this.ormRepository = getMongoRepository(Order);
  }

  public async findAll(): Promise<Order[]> {
    return this.ormRepository.find();
  }

  public async findById(id: string): Promise<Order | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findByDate(date: Date): Promise<Order | undefined> {
    return this.ormRepository.findOne({ date });
  }

  public async create({ amount, date }: ICreateOrderDTO): Promise<Order> {
    const orderExistsInDay = await this.findByDate(date);

    if (orderExistsInDay) {
      orderExistsInDay.amount += amount;
      await this.ormRepository.save(orderExistsInDay);
      return orderExistsInDay;
    }

    const order = this.ormRepository.create({
      amount,
      date,
    });

    await this.ormRepository.save(order);

    return order;
  }
}

export default OrdersRepository;
