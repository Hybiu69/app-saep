"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function NavbarScroll() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      animate={{
        backgroundColor: solid
          ? "rgba(209, 223, 236,0.45)"
          : "rgba(255,255,255,0)",
        backdropFilter: solid ? "blur(50px)": "blur(0px)",
        
      }}
      className="fixed top-0 left-0 w-full py-4 z-50 transition-all "
    >
      <div className="flex items-center justify-evenly px-6">
        <div className=" flex text-xl font-bold text-[#3a4fac] cursor-pointer">
          <Image className="w-auto" src="/images/logo.png" alt="logo" width={45} height={45} />
          <h1
            style={{ fontFamily: "var(--font-logo)" }}
            className="text-[#3a4fac] font-normal text-4xl"
          >
            E.V.A
          </h1>
        </div>

        <ul className="hidden md:flex gap-8 text-xl font-medium text-[#3a4fac] mx-auto">
          <Link href="#explorar" className="hover:text-blue-600 transition">
            Explorar
          </Link>
          <Link href="#sobre" className="hover:text-blue-600 transition">
            Avaliações
          </Link>
          <Link href="#populares" className="hover:text-blue-600 transition">
            Populares
          </Link>
        </ul>

        <Link href="/">
        <button className="px-4 py-2 rounded-lg bg-[#3a4fac] text-white hover:bg-blue-600 transition">
          Entrar
        </button>
        </Link>
      </div>
    </motion.nav>
  );
}
