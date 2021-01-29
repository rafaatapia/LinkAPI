import 'reflect-metadata';

import FindOrdersService from './FindOrdersService';
import FakeOrdersRepository from '../repositories/fakes/FakeOrdersRepository';

let fakeOrdersRepository: FakeOrdersRepository;
let findOrders: FindOrdersService;

describe('ListOrders', () => {
  beforeEach(() => {
    fakeOrdersRepository = new FakeOrdersRepository();
    findOrders = new FindOrdersService(fakeOrdersRepository);
  });

  it('should be able to list all orders', async () => {
    const order1 = await fakeOrdersRepository.create({
      amount: 10.25,
      date: new Date('2021-01-01'),
    });
    const order2 = await fakeOrdersRepository.create({
      amount: 12.25,
      date: new Date('2021-01-01'),
    });
    const order3 = await fakeOrdersRepository.create({
      amount: 15.25,
      date: new Date('2021-01-01'),
    });

    const orders = await findOrders.execute({});

    expect(orders).toEqual([order1, order2, order3]);
  });

  it('should be able to list an order by id', async () => {
    const order1 = await fakeOrdersRepository.create({
      amount: 10.25,
      date: new Date('2021-01-01'),
    });

    const order = await findOrders.execute({ id: order1.id.toString() });

    expect(order).toEqual(order1);
  });
});
