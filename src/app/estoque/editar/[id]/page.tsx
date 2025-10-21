'use client'

import NavBar from "@/app/components/navbar";
import { withAuth } from "@/app/components/withAuth";
import FormularioEstoque from "../../page";

function PaginaEdicao({ params }: { params: { id: string } }) {
  return (
    <section className='h-screen'>
      <NavBar texto={ "Edição de EsFormularioEstoque" } />
      <FormularioEstoque id={params.id} />
    </section>
  );
}

export default withAuth(PaginaEdicao);