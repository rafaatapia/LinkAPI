import IRequestCreateOrderDTO from '../dtos/IRequestCreateOrderDTO';
import IResponseCreateOrderDTO from '../dtos/IResponseCreateOrderDTO';

export default interface IOrderProvider {
  createOrder(
    request: IRequestCreateOrderDTO,
  ): Promise<IResponseCreateOrderDTO>;
}
