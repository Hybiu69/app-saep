'use client'
import FormularioPostagem from '@/app/components/FormularioPostagem';
import NavBar from '@/app/components/navbar';
import { withAuth } from '@/app/components/withAuth';


function PaginaEdicao({ params }: { params: { id: string } }) {
 
  return (
    <section className='h-screen'>
      <FormularioPostagem id={params.id} />
    </section>
  );
}

export default withAuth(PaginaEdicao);