"use client"

import React from "react"
import { useContext } from "react"
import { PlayerContext } from "../context/PlayerContext"
import { formatTime } from "../utils/formatTime"

const Player: React.FC = () => {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    progress,
    duration,
    seekTo,
    volume,
    setVolume,
  } = useContext(PlayerContext)

  if (!currentSong) return null

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    seekTo(parseFloat(e.target.value))
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value))
  }

  return (
    <div className="fixed bottom-0 w-full bg-gray-900 text-white p-4 shadow-lg">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        {/* Song info with album art */}
        <div className="flex items-center space-x-4">
          {currentSong.imageUrl ? (
            <img
              src={currentSong.imageUrl}
              alt={`${currentSong.title} album art`}
              className="h-12 w-12 object-cover rounded-md shadow-md"
            />
          ) : (
            <div className="h-12 w-12 bg-gray-700 rounded-md flex items-center justify-center">
              <span>🎵</span>
            </div>
          )}
          <div>
            <p className="font-medium truncate">{currentSong.title}</p>
            <p className="text-gray-400 text-sm truncate">
              {currentSong.artist}
            </p>
          </div>
        </div>

        {/* Playback controls */}
        <div className="flex flex-col items-center space-y-2 flex-1 max-w-xl mx-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={togglePlay}
              className="p-2 rounded-full bg-white text-gray-900 hover:bg-gray-200 focus:outline-none"
            >
              {isPlaying ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 9v6m4-6v6M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Progress bar */}
          <div className="w-full flex items-center space-x-2">
            <span className="text-xs">{formatTime(progress)}</span>
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={progress}
              onChange={handleSeek}
              className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-xs">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume control */}
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
          </svg>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  )
}

export default Player
