import { api } from './api';

export interface ContratoCardsDTO {
  totalAlunos: number;
  contratosAtivos: number;
  ContratosproximosDoFim: number;
  contratosInadimplencia: number;
}

export interface ContratoListagemView {
  id?: number;
  contratoId?: number;
  nomeAluno: string;
  imagemAluno: string | null;
  nomePlano: string;
  planoCategoria: string;
  cicloPlano: string;
  dataInicio: string | number[];
  dataFim: string | number[];
  tempoRestante: number;
  statusContrato: string;
  situacaoFinanceira: string;
  motivoDesconto?: string;
}

export interface ContratoListagemFilterDTO {
  nomePlano?: string;
  planoCategoria?: string;
  nomeAluno?: string;
  cicloPlano?: string;
  statusContrato?: string;
  situacaoFinanceira?: string;
  minDiasRestantes?: number;
  maxDiasRestantes?: number;
  inicioMin?: string;
  inicioMax?: string;
  fimMin?: string;
  fimMax?: string;
}

export interface ContratoRequestDTO {
  alunoId: number;
  planoId: number;
  dataInicio: string;
  desconto: number;
  motivoDesconto?: string;
  numeroParcelas: number;
  formaPagamento: string;
}

export interface ContratoResponseDTO {
  id: number;
  alunoId: number;
  planoId: number;
  dataInicio: string | number[];
  dataFim: string | number[];
  valorTotal: number;
}

export interface HistoricoPagamentosDTO {
  dataVencimento: string | number[];
  dataPagamento: string | number[] | null;
  valorPagamento: number;
  statusPagamento: string;
  formaPagamento: string;
}

export interface ContratoDetalhesDTO {
  contratoId: number;
  nomeAluno: string;
  imagemAluno: string;
  telefoneAluno: string;
  planoCiclo: string;
  planoCategoria: string;
  inicioContrato: string | number[];
  finalContrato: string | number[];
  valorContrato: number;
  formaPagamento: string;
  descontoContrato: number;
  motivoDesconto?: string;
  historicoPagamento: HistoricoPagamentosDTO[];
}

export const contratosService = {
  getDetalhesContrato: async (id: number): Promise<ContratoDetalhesDTO> => {
    const response = await api.get(`/contratos/detalhes/${id}`);
    return response.data;
  },

  getContratos: async (filtros?: ContratoListagemFilterDTO): Promise<ContratoListagemView[]> => {
    const response = await api.get('/contratos', {
      params: { ...filtros }
    });
    return response.data;
  },

  getResumo: async (planoCategoria: string): Promise<ContratoCardsDTO> => {
    const response = await api.get('/contratos/resumo', {
      params: { planoCategoria }
    });
    return response.data;
  },

  getById: async (id: number): Promise<ContratoListagemView> => {
    const response = await api.get(`/contratos/${id}`);
    return response.data;
  },

  create: async (data: ContratoRequestDTO): Promise<ContratoResponseDTO> => {
    const response = await api.post('/contratos', data);
    return response.data;
  },

  update: async (id: number, data: any): Promise<any> => {
    const response = await api.put(`/contratos/${id}`, data);
    return response.data;
  },

  encerrar: async (id: number): Promise<void> => {
    await api.patch(`/contratos/encerrar/${id}`);
  }
};
