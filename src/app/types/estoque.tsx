export interface Estoque {
  idEstoque: number;
  localizacao: string;
  quantidade: number;
  produto: {
    id: number;
    nome?: string;
  };
}