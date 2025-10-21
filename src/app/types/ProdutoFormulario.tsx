export interface ProdutoForm {
  id?:number;
  nome: string;
  descricao: string;
  precoCusto: number | string;
  precoVenda: number | string;
  estoqueMinimo: number | string;
  marca: string;
  modelo: string;
  anoFabricacao: string;
  compatibilidade: string;
}