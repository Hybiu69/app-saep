'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2'; 
import api from '../lib/api';
import { Postagem } from '../types/postagem';


export function usePostagens() {
  const router = useRouter();
  const [postagens, setPostagens] = useState<Postagem[]>([]);

  useEffect(() => {
    api.get<Postagem[]>('/postagens/').then(response => {
      setPostagens(response.data);
    });
  }, []);

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter esta ação!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
    });
 
    if (result.isConfirmed) {
      api.delete(`/postagens/${id}`).then(() => {
        setPostagens(postagensAtuais => postagensAtuais.filter(p => p.id !== id));
        Swal.fire('Excluído!', 'A postagem foi removida.', 'success');
      });
    }
  };

  const handleAdd = () => router.push('/postagens/cadastro'); 
  const handleEdit = (id: number) => router.push(`/postagens/editar${id}`);

  return { postagens, handleDelete, handleAdd, handleEdit };
}