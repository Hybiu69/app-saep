'use client'
import FormularioEstoque from "@/app/components/FormularioEstoque";
import NavBar from "@/app/components/navbar";
import { withAuth } from "@/app/components/withAuth";

function PaginaCadastro() {
  return (
    <section>
      <NavBar texto="Movimentação de estoque" />
      <FormularioEstoque />
    </section>
  );
}

export default withAuth(PaginaCadastro);