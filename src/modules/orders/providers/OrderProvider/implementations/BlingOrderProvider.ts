import axios, { AxiosInstance } from 'axios';

import AppError from '@shared/errors/AppError';
import IOrderProvider from '../models/IOrderProvider';
import IRequestCreateOrderDTO from '../dtos/IRequestCreateOrderDTO';
import IResponseCreateOrderDTO from '../dtos/IResponseCreateOrderDTO';

import xmlParser from '../utils/XmlParser';

class BlingOrderProvider implements IOrderProvider {
  api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.BLING_API_URL,
      params: {
        apikey: process.env.BLING_API_KEY,
      },
    });
  }

  public async createOrder(
    request: IRequestCreateOrderDTO,
  ): Promise<IResponseCreateOrderDTO> {
    try {
      const xmlParsed = await xmlParser(request);
      const { data } = await this.api.post<IResponseCreateOrderDTO>(
        'pedido/json/',
        {},
        { params: { xml: xmlParsed } },
      );

      if (data.retorno.erros) {
        throw new Error();
      }
      return data;
    } catch (err) {
      throw new AppError('Erro ao inserir pedido ao Bling', 500);
    }
  }
}

export default BlingOrderProvider;
