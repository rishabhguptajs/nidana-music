"use client"

import React, { useEffect, useState } from "react"
import { fetchSongs } from "../services/api"
import { Song } from "../types"
import SongItem from "../components/SongItem"

const Home: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadSongs = async () => {
      try {
        const data = await fetchSongs()
        setSongs(data)
      } catch (err) {
        setError("Failed to load songs")
      } finally {
        setLoading(false)
      }
    }
    loadSongs()
  }, [])

  if (loading)
    return (
      <div className="text-center py-10">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
      </div>
    )
  if (error) return <p className="text-red-500 text-center py-10">{error}</p>

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">All Songs</h1>
      <ul className="space-y-2">
        {songs.map((song) => (
          <SongItem key={song.id} song={song} />
        ))}
      </ul>
    </div>
  )
}

export default Home
