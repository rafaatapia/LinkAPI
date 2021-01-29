import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import OrdersController from '../controllers/OrdersController';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.get('/', ordersController.show);
ordersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  ordersController.show,
);
ordersRouter.post('/', ordersController.create);

export default ordersRouter;
