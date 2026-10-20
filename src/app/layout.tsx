import type { Metadata } from "next";
import { Archivo_Black, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/** Display: sans-serif ultra gruesa y geométrica para títulos gigantes. */
const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  weight: "400",
  subsets: ["latin"],
});

/** Mono: texto técnico, metadatos y cuerpo. */
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Octavio Nicolás Leiva — Software Engineering & IT Architecture",
  description:
    "Portfolio de Octavio Nicolás Leiva. Estudiante avanzado de Ingeniería en Sistemas de Información (UTN FRCU). Software Engineering, IT Architecture y DevOps.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${archivoBlack.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-black font-mono text-white">
        {children}
      </body>
    </html>
  );
}
