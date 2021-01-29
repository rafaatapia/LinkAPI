import { ObjectID } from 'mongodb';

import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';

import Order from '../../infra/typeorm/schemas/Order';

class OrdersRepository implements IOrdersRepository {
  private orders: Order[] = [];

  public async findAll(): Promise<Order[]> {
    return this.orders;
  }

  public async findById(id: string): Promise<Order | undefined> {
    const findOrder = this.orders.find(order => order.id.toString() === id);

    return findOrder;
  }

  public async findByDate(date: Date): Promise<Order | undefined> {
    const findOrder = this.orders.find(order => order.date === date);

    return findOrder;
  }

  public async create({ amount, date }: ICreateOrderDTO): Promise<Order> {
    const orderExistsDay = await this.findByDate(date);

    if (orderExistsDay) {
      const orderIndex = this.orders.findIndex(
        order => order.id === orderExistsDay.id,
      );

      this.orders[orderIndex].amount += amount;
      return this.orders[orderIndex];
    }

    const order = new Order();

    Object.assign(order, { id: new ObjectID(), amount, date });

    this.orders.push(order);

    return order;
  }
}

export default OrdersRepository;
