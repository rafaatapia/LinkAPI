import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateOportunityWonService from '@modules/orders/services/CreateOportunityWonService';
import FindOrdersService from '@modules/orders/services/FindOrdersService';

export default class OrdersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      current: { person_name, status, title, value, won_time },
    } = request.body;

    if (status !== 'won') {
      return response.status(202);
    }

    const createOportunity = container.resolve(CreateOportunityWonService);

    await createOportunity.execute({
      current: { person_name, status, title, value, won_time },
    });

    return response.status(204).json({});
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findOrders = container.resolve(FindOrdersService);

    if (id) {
      const order = await findOrders.execute({ id });
      return response.json(classToClass(order));
    }

    const orders = await findOrders.execute({});

    return response.json(classToClass(orders));
  }
}
