'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import api from '../lib/api';
import { PostagemForm } from '../types/PostagemFormulario';


export function useFormularioPostagem(id?: string) {
  const router = useRouter();
  const [form, setForm] = useState<PostagemForm>({
      nome: '',
      numero:'',
      rua:'',
      bairro:'',
      url:'',
      descricao:''
  });
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      api.get(`/postagens/${id}`)
        .then(response => setForm(response.data))
        .catch(() => {
          Swal.fire('Erro', 'Postagem não encontrada', 'error').then(() => router.push('/postagens/'));
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
      router.push('/postagens/');
    },

    handleSubmit: (e: React.FormEvent) => {
      e.preventDefault();

      // Ponto Crítico: Conversão dos dados para o formato do backend
      const postagemParaEnviar = {
        ...form,
        numero: Number(String(form.numero))|| 0,
      };

      const method = isEditMode ? 'put' : 'post';
      const url = isEditMode ? `/postagens/${id}` : '/postagens/';
      const successMessage = `Postagem ${isEditMode ? 'atualizado' : 'cadastrado'} com sucesso!`;

      api[method](url, postagemParaEnviar)
        .then(() => {
          return Swal.fire('Sucesso', successMessage, 'success');
        })
        .then(() => {
          router.push('/homepage');
        })
        .catch((error) => {
          console.error("Falha ao salvar a postagem:", error);
          Swal.fire('Erro', 'Não foi possível salvar a postagem.', 'error');
        });
    },
  };
}