"use client"

import React from "react"
import { useContext, useEffect, useState } from "react"
import { FavoritesContext } from "../../context/FavoritesContext"
import { fetchSongs } from "../../services/api"
import { Song } from "../../types"
import SongItem from "../../components/SongItem"

const Favorites: React.FC = () => {
  const { favorites } = useContext(FavoritesContext)
  const [favoriteSongs, setFavoriteSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadFavoriteSongs = async () => {
      try {
        const allSongs = await fetchSongs()
        const favSongs = allSongs.filter((song) => favorites.includes(song.id))
        setFavoriteSongs(favSongs)
      } catch (err) {
        setError("Failed to load favorite songs")
      } finally {
        setLoading(false)
      }
    }
    loadFavoriteSongs()
  }, [favorites])

  if (loading) return <p className="text-center">Loading...</p>
  if (error) return <p className="text-red-500 text-center">{error}</p>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Favorite Songs</h1>
      <ul className="space-y-2">
        {favoriteSongs.map((song) => (
          <SongItem key={song.id} song={song} />
        ))}
      </ul>
    </div>
  )
}

export default Favorites
