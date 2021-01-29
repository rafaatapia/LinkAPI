import { Router } from 'express';

import ordersRouter from '@modules/orders/infra/http/routes/orders.routes';

const routes = Router();

routes.use('/orders', ordersRouter);

export default routes;
