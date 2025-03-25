"use client"

import React from "react"
import { useContext } from "react"
import { FavoritesContext } from "../context/FavoritesContext"
import { PlayerContext } from "../context/PlayerContext"
import { Song } from "../types"
import { formatTime } from "../utils/formatTime"

interface SongItemProps {
  song: Song
}

const SongItem: React.FC<SongItemProps> = ({ song }) => {
  const { addFavorite, removeFavorite, isFavorite } =
    useContext(FavoritesContext)
  const { setCurrentSong, currentSong, isPlaying, togglePlay } =
    useContext(PlayerContext)
  const favorite = isFavorite(song.id)
  const isCurrentSong = currentSong?.id === song.id

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isCurrentSong) {
      togglePlay()
    } else {
      setCurrentSong(song)
    }
  }

  return (
    <li
      className={`flex justify-between items-center p-3 rounded-md hover:bg-gray-100 transition-colors ${
        isCurrentSong ? "bg-blue-50" : ""
      }`}
    >
      <div className="flex items-center space-x-3 flex-1">
        {/* Album art or placeholder */}
        <div className="relative w-12 h-12 flex-shrink-0">
          {song.imageUrl ? (
            <img
              src={song.imageUrl}
              alt={`${song.album} cover`}
              className="w-full h-full object-cover rounded"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
              <span className="text-gray-500">🎵</span>
            </div>
          )}

          {/* Play/Pause button overlay */}
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 hover:opacity-100 rounded transition-opacity"
          >
            {isCurrentSong && isPlaying ? (
              <svg
                className="h-6 w-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <rect x="6" y="4" width="4" height="16" rx="1" ry="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" ry="1" />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>

        {/* Song information */}
        <div className="min-w-0 flex-1">
          <p className="font-medium truncate">{song.title}</p>
          <p className="text-gray-500 text-sm truncate">{song.artist}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Duration if available */}
        {song.duration && (
          <span className="text-sm text-gray-500 w-10 text-right">
            {formatTime(song.duration)}
          </span>
        )}

        {/* Favorite button */}
        <button
          className={`flex-shrink-0 p-1.5 rounded-full ${
            favorite
              ? "text-red-500 hover:bg-red-50"
              : "text-gray-400 hover:bg-gray-100"
          }`}
          onClick={(e) => {
            e.stopPropagation()
            favorite ? removeFavorite(song.id) : addFavorite(song.id)
          }}
        >
          {favorite ? (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          )}
        </button>
      </div>
    </li>
  )
}

export default SongItem
