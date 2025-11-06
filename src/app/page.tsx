"use client";

import Image from "next/image";
import Link from "next/link";
import { useLogin } from "./hooks/useLogin";

export default function Home() {
  const { form, handleChange, handleLogin } = useLogin();
  return (
    <div className="flex h-screen bg-white text-gray-800">
      <div className="hidden lg:flex w-1/2 relative items-end justify-center">
        <Image
          src="/images/fishing.png"
          alt="Lago de Itapetininga ao pôr do sol"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute bottom-25 left-10 text-white drop-shadow-lg">
          <h1 className="text-3xl font-bold mb-2">Bem vindo de volta!</h1>
          <p className="text-base">
            Faça seu login e explore inúmeros lugares em Itapetininga
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-sm">
          <h2 className="text-3xl font-semibold text-center text-[#172550] mb-8">
            Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[#31437a] font-semibold mb-1">
                Usuário
              </label>
              <input
                type="text"
                name="username"
                placeholder="Usuário"
                value={form.username}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-100 focus:outline-none shadow-sm focus:ring-2 focus:ring-[#3a4fac]"
              />
            </div>

            <div>
              <label className="block text-[#31437a] font-semibold mb-1">
                Senha
              </label>
              <input
                type="password"
                name="password"
                placeholder="Senha"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-100 focus:outline-none shadow-sm focus:ring-2 focus:ring-[#3a4fac]"
              />
            </div>

            <div className="text-center text-sm">
              <Link href="/register" className="text-[#3a4fac] hover:underline">
                Ainda não possui LOGIN? Cadastre-se agora!
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#636cc0] hover:bg-[#3a4fac] text-white font-semibold py-3 rounded-xl shadow-md transition"
            >
              ENTRAR
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
