import { Song } from "../types"

const API_URL = "https://nidana-server.onrender.com"

export const fetchSongs = async (): Promise<Song[]> => {
  const response = await fetch(`${API_URL}/songs`)
  if (!response.ok) throw new Error("Failed to fetch songs")
  return response.json()
}

export const searchSongs = async (query: string): Promise<Song[]> => {
  const response = await fetch(`${API_URL}/songs/search?q=${query}`)
  if (!response.ok) throw new Error("Failed to search songs")
  return response.json()
}
