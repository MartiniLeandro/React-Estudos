import { api } from './api';

export interface AlunoCardsDTO {
  quantidadeAlunos: number;
  contratosAtivos: number;
  proximosFim: number;
  inadimplentes: number;
}

export interface AlunoListagemView {
  id: number;
  imagem: string | null;
  nome: string;
  telefone?: string;
  plano: string;
  dataInicio: string;
  dataFim: string;
  tempoRestante: number;
  statusFinanceiro: string;
  statusAluno: string;
  dataCadastro?: string;
  data_cadastro?: string;
  dataProximaFatura?: string;
  data_proxima_fatura?: string;
}

export interface AlunoRequestDTO {
  nome: string;
  telefone: string;
  imagem?: string;
  status: 'ATIVO' | 'INATIVO' | 'PAUSADO';
}

export interface AlunoResponseDTO {
  id: number;
  nome: string;
  telefone: string;
  imagem: string | null;
  status: 'ATIVO' | 'INATIVO' | 'PAUSADO';
}

export const alunosService = {
  getResumo: async (planoCategoria?: string): Promise<AlunoCardsDTO> => {
    const response = await api.get('/alunos/resumo', {
      params: { planoCategoria }
    });
    return response.data;
  },

  getAlunos: async (filtros?: any): Promise<AlunoListagemView[]> => {
    const response = await api.get('/alunos', {
      params: { ...filtros }
    });
    return response.data;
  },

  createAluno: async (data: AlunoRequestDTO, imagemFile?: File): Promise<AlunoResponseDTO> => {
    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
    
    if (imagemFile) {
      formData.append('imagem', imagemFile);
    }

    const response = await api.post('/alunos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  updateAluno: async (id: number, data: AlunoRequestDTO, imagemFile?: File): Promise<AlunoResponseDTO> => {
    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
    
    if (imagemFile) {
      formData.append('imagem', imagemFile);
    }

    const response = await api.put(`/alunos/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  reativarAluno: async (id: number): Promise<void> => {
    await api.patch(`/alunos/${id}/reativar`);
  },

  inativarAluno: async (id: number): Promise<void> => {
    await api.patch(`/alunos/${id}/inativar`);
  }
};
