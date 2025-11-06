'use client'
import FormularioPostagem from "@/app/components/FormularioPostagem";
import NavBar from "@/app/components/navbar";

import { withAuth } from "@/app/components/withAuth";

function PaginaCadastro() {
  return (
    <section>
      <NavBar/>
      <FormularioPostagem/>
    </section>
  );
}

export default withAuth(PaginaCadastro);