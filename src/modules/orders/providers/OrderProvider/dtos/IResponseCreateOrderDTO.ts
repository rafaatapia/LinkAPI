// Generated by https://quicktype.io

export interface CodigosRastreamento {
  codigo_rastreamento: string;
}

export interface Volume {
  servico: string;
  codigoRastreamento: string;
}

export interface Pedido {
  numero: string;
  idPedido: number;
  codigos_rastreamento: CodigosRastreamento;
  volumes: Volume[];
}

export interface Erro {
  cod: string;
  msg: string;
}

export default interface IResponseCreateOrderDTO {
  retorno: {
    pedidos: Pedido[];
    erros: Erro[];
  };
}
