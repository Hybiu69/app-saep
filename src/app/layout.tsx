import "./globals.css";
import { League_Spartan, League_Gothic} from "next/font/google";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const LeagueGothic = League_Gothic({
  subsets: ["latin"],
  weight: ["400"],
  variable:'--font-logo', 
});

<span
    className="font-semibold text-lg tracking-wide"
    style={{ fontFamily: "var(--font-logo)" }}
  ></span>
export const metadata = {
  title: "E.V.A",
  description: "Explorador de lugares acessíveis em Itapetininga",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br"  className={`${leagueSpartan.className} ${LeagueGothic.variable}`}>
      <body>{children}</body>
    </html>
  );
}
