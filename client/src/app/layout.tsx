import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "../components/Navbar"
import Player from "../components/Player"
import { FavoritesProvider } from "../context/FavoritesContext"
import { PlayerProvider } from "../context/PlayerContext"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Music App",
  description: "A simple music application built with Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PlayerProvider>
          <FavoritesProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Player />
          </FavoritesProvider>
        </PlayerProvider>
      </body>
    </html>
  )
}
