import { container } from 'tsyringe';

import IOrderProvider from './models/IOrderProvider';
import BlingOrderProvider from './implementations/BlingOrderProvider';

container.registerSingleton<IOrderProvider>(
  'OrderProvider',
  BlingOrderProvider,
);
