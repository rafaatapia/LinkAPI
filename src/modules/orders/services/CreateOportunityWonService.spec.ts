import 'reflect-metadata';

import CreateOportunityWonService from './CreateOportunityWonService';
import FakeOrdersRepository from '../repositories/fakes/FakeOrdersRepository';
import FakeOrderProvider from '../providers/OrderProvider/fakes/FakeOrderProvider';

let fakeOrdersRepository: FakeOrdersRepository;
let fakeOrderProvider: FakeOrderProvider;
let createOrders: CreateOportunityWonService;

describe('CreateOrder', () => {
  beforeEach(() => {
    fakeOrdersRepository = new FakeOrdersRepository();
    fakeOrderProvider = new FakeOrderProvider();
    createOrders = new CreateOportunityWonService(
      fakeOrderProvider,
      fakeOrdersRepository,
    );
  });

  it('should be able to create a new order', async () => {
    const oportunity = {
      current: {
        person_name: 'John Doe',
        value: 100.2,
        title: 'Negotiation Example',
        status: 'won',
        won_time: new Date(),
      },
    };
    await createOrders.execute(oportunity);

    const [orders] = await fakeOrdersRepository.findAll();

    expect(orders.amount).toEqual(100.2);
  });
});
