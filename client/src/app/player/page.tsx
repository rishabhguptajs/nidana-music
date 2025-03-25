"use client"

import React, { useContext, useEffect } from "react"
import { PlayerContext } from "../../context/PlayerContext"
import { formatTime } from "../../utils/formatTime"
import { useRouter } from "next/navigation"

const PlayerPage = () => {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    progress,
    duration,
    seekTo,
    volume,
    setVolume,
    playNextSong,
    playPreviousSong,
  } = useContext(PlayerContext)
  const router = useRouter()

  useEffect(() => {
    if (!currentSong) {
      router.push("/")
    }
  }, [currentSong, router])

  if (!currentSong) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    seekTo(parseFloat(e.target.value))
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value))
  }

  // Calculate progress percentage for styling
  const progressPercentage = duration ? (progress / duration) * 100 : 0

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Album art */}
          <div className="w-64 h-64 md:w-80 md:h-80 flex-shrink-0">
            {currentSong.imageUrl ? (
              <img
                src={currentSong.imageUrl}
                alt={`${currentSong.title} album art`}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-5xl">🎵</span>
              </div>
            )}
          </div>

          {/* Song info and controls */}
          <div className="flex flex-col flex-1 space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{currentSong.title}</h1>
              <p className="text-xl text-gray-600">{currentSong.artist}</p>
              <p className="text-gray-500 mt-1">Album: {currentSong.album}</p>
              <div className="mt-2 inline-block px-3 py-1 bg-gray-200 rounded-full text-sm">
                {currentSong.genre}
              </div>
            </div>

            {/* Playback controls */}
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-6">
                <button
                  className="p-3 rounded-full bg-gray-200 hover:bg-gray-300"
                  onClick={playPreviousSong}
                >
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  className="p-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
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
                      className="h-8 w-8"
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

                <button
                  className="p-3 rounded-full bg-gray-200 hover:bg-gray-300"
                  onClick={playNextSong}
                >
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              {/* Progress bar */}
              <div className="space-y-2">
                <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="absolute h-full bg-blue-600 transition-all duration-150"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={progress}
                    onChange={handleSeek}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{formatTime(progress)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Volume control */}
              <div className="flex items-center space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
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
                  className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerPage
