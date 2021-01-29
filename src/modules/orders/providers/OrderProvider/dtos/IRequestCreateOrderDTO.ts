interface Customer {
  nome: string;
}

interface Volume {
  servico: string;
  codigoRastreamento?: string;
}

interface Item {
  codigo: string;
  descricao: string;
  qtde: number;
  vlr_unit: number;
}

interface Parcela {
  vlr: number;
}

export default interface IRequestCreateOrderDTO {
  customer: Customer;
  volumes: Volume[];
  itens: Item[];
  parcelas: Parcela[];
}
