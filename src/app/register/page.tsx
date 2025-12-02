'use client';

import Image from "next/image";
import Link from "next/link";
import { useRegister } from "@/app/hooks/useRegister";

export default function Register() {
  const { form, handleChange, handleRegister } = useRegister();

  const inputFields = [
    { label: "Nome", name: "name", placeholder: "Digite seu nome aqui" },
    { label: "Usuário", name: "username", placeholder: "Digite seu usuário aqui" },
    { label: "Senha", name: "password", placeholder: "Digite sua senha aqui", type: "password" }
  ];

  return (
    <div className="flex h-screen bg-white text-gray-800">
      <div className="hidden lg:flex w-1/2 relative items-end justify-center">
        <Image
          src="/images/palmeiras.png"
          alt="Praça e palmeiras em Itapetininga"
          fill
          className="object-cover brightness-90"
          priority
        />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-sm">
          <h2 className="text-3xl font-semibold text-center text-[#172550] mb-8">
            Cadastro
          </h2>

          <form onSubmit={handleRegister} className="space-y-6">
            {inputFields.map(({ label, name, placeholder, type = "text" }) => (
              <div key={name}>
                <label className="block text-[#31437a] font-semibold mb-1">
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  value={form[name as keyof typeof form]}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-100 focus:outline-none shadow-sm focus:ring-2 focus:ring-[#3a4fac]"
                />
              </div>
            ))}

            <div className="text-center text-sm">
              <Link href="/" className="text-[#3a4fac] hover:underline">
                Já possui um LOGIN? Entre agora!
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#636cc0] hover:bg-[#3a4fac] text-white font-semibold py-3 rounded-xl shadow-md transition"
            >
              CADASTRAR
            </button>
          </form>

          <div className="flex items-center justify-center mt-12 space-x-2 text-[#3a4fac]">
            <div className="flex items-center justify-center text-white text-sm">
              <Image src="/images/logo.png" alt="logo" width={40} height={40} />
            </div>
            <span
              className="text-4xl"
              style={{ fontFamily: "var(--font-logo)" }}
            >
              E.V.A
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
