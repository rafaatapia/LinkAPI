import { container } from 'tsyringe';

import '@modules/orders/providers';
import './providers';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);
