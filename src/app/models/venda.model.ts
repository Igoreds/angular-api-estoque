export interface Venda {
    id?: number;
    produto: {
      id: number;
      nome: string;
    };
    quantidade: number;
    valorTotal: number;
    dataVenda: string;
  }