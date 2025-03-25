"use client"

import React, { createContext, useState, useRef, useEffect } from "react"
import { Song } from "../types"
import { fetchSongs } from "../services/api"

interface PlayerContextType {
  currentSong: Song | null
  setCurrentSong: (song: Song | null) => void
  isPlaying: boolean
  togglePlay: () => void
  progress: number
  duration: number
  audioRef: React.RefObject<HTMLAudioElement | null>
  handleTimeUpdate: () => void
  seekTo: (time: number) => void
  volume: number
  setVolume: (value: number) => void
  playNextSong: () => void
  playPreviousSong: () => void
  queue: Song[]
}

export const PlayerContext = createContext<PlayerContextType>({
  currentSong: null,
  setCurrentSong: () => {},
  isPlaying: false,
  togglePlay: () => {},
  progress: 0,
  duration: 0,
  audioRef: { current: null },
  handleTimeUpdate: () => {},
  seekTo: () => {},
  volume: 0.8,
  setVolume: () => {},
  playNextSong: () => {},
  playPreviousSong: () => {},
  queue: [],
})

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [queue, setQueue] = useState<Song[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Load all songs for queue functionality
  useEffect(() => {
    const loadSongs = async () => {
      try {
        const songs = await fetchSongs()
        setQueue(songs)
      } catch (error) {
        console.error("Failed to load songs for queue:", error)
      }
    }

    loadSongs()
  }, [])

  // Effect to play/pause when isPlaying state changes
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error)
          setIsPlaying(false)
        })
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, currentSong])

  // Effect to update audio duration when song changes
  useEffect(() => {
    if (audioRef.current && currentSong) {
      setIsPlaying(false)
      setProgress(0)

      // After the song is loaded, start playing automatically
      const handleCanPlay = () => {
        setDuration(audioRef.current?.duration || 0)
        setIsPlaying(true)
      }

      audioRef.current.addEventListener("canplay", handleCanPlay)

      return () => {
        audioRef.current?.removeEventListener("canplay", handleCanPlay)
      }
    }
  }, [currentSong])

  // Effect to update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime)
    }
  }

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setProgress(time)
    }
  }

  const playNextSong = () => {
    if (!currentSong || queue.length === 0) return

    const currentIndex = queue.findIndex((song) => song.id === currentSong.id)
    if (currentIndex === -1) return

    const nextIndex = (currentIndex + 1) % queue.length
    setCurrentSong(queue[nextIndex])
  }

  const playPreviousSong = () => {
    if (!currentSong || queue.length === 0) return

    const currentIndex = queue.findIndex((song) => song.id === currentSong.id)
    if (currentIndex === -1) return

    const previousIndex = (currentIndex - 1 + queue.length) % queue.length
    setCurrentSong(queue[previousIndex])
  }

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        isPlaying,
        togglePlay,
        progress,
        duration,
        audioRef,
        handleTimeUpdate,
        seekTo,
        volume,
        setVolume,
        playNextSong,
        playPreviousSong,
        queue,
      }}
    >
      {children}
      {currentSong && currentSong.audioUrl && (
        <audio
          ref={audioRef}
          src={currentSong.audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onEnded={playNextSong}
          onDurationChange={() => {
            if (audioRef.current) {
              setDuration(audioRef.current.duration)
            }
          }}
        />
      )}
    </PlayerContext.Provider>
  )
}
