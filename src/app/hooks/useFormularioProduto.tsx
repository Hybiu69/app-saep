'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import api from '../lib/api';
import { ProdutoForm } from '../types/ProdutoFormulario';


export function useFormularioProduto(id?: string) {
  const router = useRouter();
  const [form, setForm] = useState<ProdutoForm>({
      nome: '',
      descricao: '',
      precoCusto: '',
      precoVenda: '',
      estoqueMinimo: '',
      marca: '',
      modelo: '',
      anoFabricacao: '',
      compatibilidade: ''
  });
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      api.get(`/produtos/${id}`)
        .then(response => setForm(response.data))
        .catch(() => {
          Swal.fire('Erro', 'Produto não encontrado', 'error').then(() => router.push('/produtos'));
        });
    }
  }, [id, isEditMode, router]);

  return {
    form,
    isEditMode,
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm(currentForm => ({ ...currentForm, [name]: value }));
    },
    handleCancel: () => {
      router.push('/produtos');
    },

    handleSubmit: (e: React.FormEvent) => {
      e.preventDefault();

      // Ponto Crítico: Conversão dos dados para o formato do backend
      const produtoParaEnviar = {
        ...form,
        precoCusto: Number(String(form.precoCusto))|| 0,
        precoVenda: Number(String(form.precoVenda))|| 0,
        estoqueMinimo: Number(String(form.estoqueMinimo))|| 0
      };

      const method = isEditMode ? 'put' : 'post';
      const url = isEditMode ? `/produtos/${id}` : '/produtos/';
      const successMessage = `Produto ${isEditMode ? 'atualizado' : 'cadastrado'} com sucesso!`;

      api[method](url, produtoParaEnviar)
        .then(() => {
          return Swal.fire('Sucesso', successMessage, 'success');
        })
        .then(() => {
          router.push('/produtos');
        })
        .catch((error) => {
          console.error("Falha ao salvar o produto:", error);
          Swal.fire('Erro', 'Não foi possível salvar o produto.', 'error');
        });
    },
  };
}