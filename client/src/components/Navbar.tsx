"use client"

import React from "react"
import Link from "next/link"
import { useContext } from "react"
import { PlayerContext } from "../context/PlayerContext"

const Navbar: React.FC = () => {
  const { currentSong } = useContext(PlayerContext)

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <ul className="flex space-x-4 text-white">
          <li>
            <Link href="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/search" className="hover:text-gray-300">
              Search
            </Link>
          </li>
          <li>
            <Link href="/favorites" className="hover:text-gray-300">
              Favorites
            </Link>
          </li>
          {currentSong && (
            <li>
              <Link
                href="/player"
                className="hover:text-gray-300 flex items-center"
              >
                <span className="mr-1">Now Playing</span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
