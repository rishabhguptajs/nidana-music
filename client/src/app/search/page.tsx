"use client"

import React from "react"
import { useState } from "react"
import { searchSongs } from "../../services/api"
import { Song } from "../../types"
import SongItem from "../../components/SongItem"

const Search: React.FC = () => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Song[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async () => {
    if (!query) return
    setLoading(true)
    setError(null)
    try {
      const data = await searchSongs(query)
      setResults(data)
    } catch (err) {
      setError("Failed to search songs")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search Songs</h1>
      <div className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 mr-2 w-64"
          placeholder="Search by title or artist"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Search
        </button>
      </div>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      <ul className="space-y-2">
        {results.map((song) => (
          <SongItem key={song.id} song={song} />
        ))}
      </ul>
    </div>
  )
}

export default Search
