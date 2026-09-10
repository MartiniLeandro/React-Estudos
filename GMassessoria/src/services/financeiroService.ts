import { api } from './api';

export interface FluxoCaixaDTO {
  mes: number;
  ano: number;
  valorPrevisto: number;
  valorRecebido: number;
}

export interface RecebimentoPorPlanoDTO {
  plano: string;
  valorRecebido: number;
}

export interface FinanceiroResumoDTO {
  faturamentoPrevisto: number;
  faturamentoRecebido: number;
  faturamentoReceber: number;
  inadimplenciaTotal: number;
  fluxoCaixa: FluxoCaixaDTO[];
  recebimentoPorPlano: RecebimentoPorPlanoDTO[];
}

export interface ListagemFaturasDTO {
  id: number;
  dataVencimento: any;
  dataPagamento?: any;
  numeroParcelas: number;
  aluno: string;
  plano: string;
  ciclo: string;
  valorCobrado: number;
  status: string;
  formaPagamento: string;
}

export interface ListagemFinanceiroFilterDTO {
  mes?: number;
  ano?: number;
  nomeAluno?: string;
  status?: string;
  sort?: string;
}

const financeiroService = {
  getResumoFinanceiro: async (mes: number, ano: number): Promise<FinanceiroResumoDTO> => {
    const response = await api.get<FinanceiroResumoDTO>('/financeiro', {
      params: { mes, ano }
    });
    return response.data;
  },

  getListagemFaturas: async (filtros: ListagemFinanceiroFilterDTO): Promise<ListagemFaturasDTO[]> => {
    const response = await api.get<ListagemFaturasDTO[]>('/financeiro/listagem', {
      params: filtros
    });
    console.log('Faturas listagem:', response.data);
    return response.data;
  },

  pagamentoFatura: async (id: number): Promise<void> => {
    await api.patch(`/financeiro/fatura/pagar/${id}`);
  },

  estornarFatura: async (id: number): Promise<void> => {
    await api.patch(`/financeiro/fatura/estornar/${id}`);
  }
};

export default financeiroService;
