import { api } from './api';

export interface ResumoCardsDashboardDTO {
  faturamentoPrevisto: number;
  faturamentoRecebido: number;
  inadimplenciaTotal: number;
  alunosAtivos: number;
  contratosVencendo: number;
  novosAlunos: number;
}

export interface AlunosPorPlanoDTO {
  plano: string;
  quantidadeAlunos: number;
}

export interface EvolucaoAlunosDTO {
  mes: string;
  alunosAtivos: number;
  novosAlunos: number;
}

export interface AlunosContratosProximoFimListagemDTO {
  imagemAluno: string | null;
  nomeAluno: string;
  dataInicio: string | number[];
  dataFim: string | number[];
  diasRestantes: number;
}

export const dashboardService = {
  getResumoCards: async (mes: number, ano: number, planoCategoria?: string): Promise<ResumoCardsDashboardDTO> => {
    const params: any = { mes, ano };
    if (planoCategoria) params.planoCategoria = planoCategoria;
    const response = await api.get('/dashboard/resumo', { params });
    return response.data;
  },

  getDistribuicaoPlanos: async (mes: number, ano: number): Promise<AlunosPorPlanoDTO[]> => {
    const response = await api.get('/dashboard/plano-grafico', { params: { mes, ano } });
    return response.data;
  },

  getEvolucao: async (ano: number): Promise<EvolucaoAlunosDTO[]> => {
    const response = await api.get('/dashboard/evolucao-grafico', { params: { ano } });
    return response.data;
  },

  getContratosVencendo: async (mes: number, ano: number): Promise<AlunosContratosProximoFimListagemDTO[]> => {
    const response = await api.get('/dashboard/contratos-vencendo', { params: { mes, ano } });
    return response.data;
  }
};
