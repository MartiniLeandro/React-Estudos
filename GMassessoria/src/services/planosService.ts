import { api } from './api';

export interface PlanoCardsDTO {
  totalPlanos: number;
  planosAtivos: number;
  mediaValor: number;
  maiorValor: number;
}

export interface PlanoResponseListagemDTO {
  id: number;
  ciclo: string;
  nome: string;
  valorBase: number;
  planoStatus: 'ATIVO' | 'INATIVO';
  quantidadeAlunos: number;
}

export interface PlanoRequestDTO {
  nome: string;
  ciclo: string;
  valorBase: number;
}

export interface PlanoResponseDTO {
  id: number;
  nome: string;
  ciclo: string;
  valorBase: number;
  status: 'ATIVO' | 'INATIVO';
}

export const planosService = {
  getResumo: async (): Promise<PlanoCardsDTO> => {
    const response = await api.get('/planos/resumo');
    return response.data;
  },

  getPlanos: async (filtros?: any): Promise<PlanoResponseListagemDTO[]> => {
    const response = await api.get('/planos', {
      params: { ...filtros }
    });
    return response.data;
  },

  createPlano: async (data: PlanoRequestDTO): Promise<PlanoResponseDTO> => {
    const response = await api.post('/planos', data);
    return response.data;
  },
  
  updatePlano: async (id: number, data: PlanoRequestDTO): Promise<PlanoResponseDTO> => {
    const response = await api.put(`/planos/${id}`, data);
    return response.data;
  },

  reativarPlano: async (id: number): Promise<void> => {
    await api.patch(`/planos/${id}/reativar`);
  },

  inativarPlano: async (id: number): Promise<void> => {
    await api.patch(`/planos/${id}/inativar`);
  }
};
