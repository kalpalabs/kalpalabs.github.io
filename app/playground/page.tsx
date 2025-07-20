'use client'

import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js/auto'
import type { ChartConfiguration, Chart as ChartJS } from 'chart.js'
import { Mic, MicOff, CircleStop } from "lucide-react"
import { Navbar } from '@/components/navbar'


type UIState =
  | 'CONVERSATION_NOT_STARTED'
  | 'USER_SPEAKING'
  | 'AI_SPEAKING'
  | 'WAITING_FOR_RESPONSE'

const VOICES = ['tara', 'leah', 'jess', 'leo', 'dan', 'mia', 'zac', 'zoe'] as const

function RealtimePlayground() {
  const [uiState, setUiState] = useState<UIState>('CONVERSATION_NOT_STARTED')
  const [selectedVoice, setSelectedVoice] = useState<string>('tara')

  const audioRef = useRef<HTMLAudioElement>(null)
  const latencyCanvasRef = useRef<HTMLCanvasElement>(null)

  const wsRef = useRef<WebSocket | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const recordingChunksRef = useRef<BlobPart[]>([])
  const audioQueueRef = useRef<Uint8Array[]>([])
  const sourceBufferRef = useRef<SourceBuffer | null>(null)
  const chartRef = useRef<ChartJS | null>(null)
  const previousChunkReceivedTimeRef = useRef<number>(0)
  const latencyStartTimeRef = useRef<number | null>(null)

  const getWsUrl = (voiceName?: string) => {
    const path = voiceName ? `/${encodeURIComponent(voiceName)}` : ''
    const protocol = typeof window !== 'undefined' && location.protocol === 'https:' ? 'wss:' : 'ws:'
    return `${protocol}//${location.host}/ws/speech${path}`
  }

  const pumpSourceBuffer = () => {
    const sourceBuffer = sourceBufferRef.current
    const queue = audioQueueRef.current
    if (!sourceBuffer || sourceBuffer.updating || !queue.length) return
    sourceBuffer.appendBuffer(queue.shift()!)
  }

  useEffect(() => {
    if (!latencyCanvasRef.current) return

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Latency (ms)',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.1,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: true, position: 'top' } },
        maintainAspectRatio: false,
        aspectRatio: 1.75,
        scales: {
          x: { title: { display: false, text: 'Elapsed Time (ms)' } },
          y: { min: 0, suggestedMax: 400, title: { display: true, text: 'Latency (ms)' } },
        },
      },
    }

    chartRef.current = new Chart(latencyCanvasRef.current, config)
    return () => chartRef.current?.destroy()
  }, [])

  // ================= WebSocket & MediaSource setup =================
  useEffect(() => {
    const wsUrl = getWsUrl(selectedVoice)
    const player = audioRef.current
    if (!player) return

    const mediaSource = new MediaSource()
    player.src = URL.createObjectURL(mediaSource)

    const handleSourceOpen = () => {
      sourceBufferRef.current = mediaSource.addSourceBuffer('audio/webm; codecs="opus"')
      sourceBufferRef.current.mode = 'sequence'
      sourceBufferRef.current.addEventListener('updateend', pumpSourceBuffer)
    }
    mediaSource.addEventListener('sourceopen', handleSourceOpen)

    const ws = new WebSocket(wsUrl)
    ws.binaryType = 'arraybuffer'
    wsRef.current = ws

    ws.onopen = () => console.log('WebSocket opened')

    ws.onmessage = ({ data }) => {
      if (uiState === 'WAITING_FOR_RESPONSE') setUiState('AI_SPEAKING')

      const now = Date.now()
      if (latencyStartTimeRef.current !== null) {
        const elapsed = now - latencyStartTimeRef.current
        const latencyMs = now - previousChunkReceivedTimeRef.current
        chartRef.current?.data.labels?.push(elapsed.toString())
          ; (chartRef.current?.data.datasets[0].data as number[]).push(latencyMs)
        chartRef.current?.update()
      }
      previousChunkReceivedTimeRef.current = now

      audioQueueRef.current.push(new Uint8Array(data as ArrayBuffer))
      pumpSourceBuffer()
    }

    ws.onclose = () => {
      console.log('WebSocket closed')
      if (mediaSource.readyState === 'open') {
        if (sourceBufferRef.current?.updating) {
          sourceBufferRef.current.addEventListener('updateend', () => mediaSource.endOfStream(), { once: true })
        } else {
          mediaSource.endOfStream()
        }
      }
    }

    ws.onerror = (err) => console.error('WebSocket error:', err)

    return () => {
      ws.close()
      mediaSource.removeEventListener('sourceopen', handleSourceOpen)
      sourceBufferRef.current?.removeEventListener('updateend', pumpSourceBuffer)
    }
  }, [selectedVoice])

  // ================= Recording Helpers =================
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      recordingChunksRef.current = []
      const recorder = new MediaRecorder(stream)
      mediaRecorderRef.current = recorder

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) recordingChunksRef.current.push(e.data)
      }

      recorder.onstop = () => {
        const audioBlob = new Blob(recordingChunksRef.current, { type: 'audio/webm' })
        if (wsRef.current?.readyState === WebSocket.OPEN) {
          if (latencyStartTimeRef.current === null) latencyStartTimeRef.current = Date.now()
          wsRef.current.send(audioBlob)
          previousChunkReceivedTimeRef.current = Date.now()
        }
        audioRef.current?.play().catch(console.error)
      }

      recorder.start()
    } catch (err) {
      console.error('Error starting audio recording:', err)
    }
  }

  const handleMuteClick = () => {
    if (uiState === 'CONVERSATION_NOT_STARTED' || uiState === 'AI_SPEAKING' || uiState === 'WAITING_FOR_RESPONSE') {
      if (uiState === 'AI_SPEAKING' || uiState === 'WAITING_FOR_RESPONSE') audioRef.current?.pause()
      setUiState('USER_SPEAKING')
      startRecording()
    } else if (uiState === 'USER_SPEAKING') {
      setUiState('WAITING_FOR_RESPONSE')
      if (mediaRecorderRef.current?.state === 'recording') mediaRecorderRef.current.stop()
    }
  }

  const handleEndClick = () => {
    setUiState('CONVERSATION_NOT_STARTED')
    wsRef.current?.close()
  }

  const muteButtonLabel =
    uiState === 'CONVERSATION_NOT_STARTED' ? 'Start Talking' : uiState === 'USER_SPEAKING' ? 'Mute' : 'Unmute'

  return (
    <main className="flex flex-col items-center justify-center select-none px-4 py-4">
      {/* Mic visualisation */}
      <div className="relative mb-8">
        <div className="flex justify-center">
          <div
            className={`relative flex items-center justify-center w-48 h-48 rounded-full focus:outline-none transition-colors duration-300 ${uiState === 'USER_SPEAKING' ? 'pulse-ring' : ''
              }`}
          >
            {/* Mic icon */}
            {(uiState === 'CONVERSATION_NOT_STARTED' || uiState === 'USER_SPEAKING') && (
              <Mic className="w-24 h-24 text-[#514437]" />
            )}

            {/* Equaliser when AI is speaking */}
            {uiState === 'AI_SPEAKING' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-12 mx-1 eq-bar" />
                <div className="w-2 h-12 mx-1 eq-bar" />
                <div className="w-2 h-12 mx-1 eq-bar" />
              </div>
            )}

            {/* Waiting dots */}
            {uiState === 'WAITING_FOR_RESPONSE' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex space-x-1">
                  <span className="dot bg-[#514437] rounded-full w-3 h-3 animate-bounce" style={{ animationDelay: '0s' }} />
                  <span className="dot bg-[#514437] rounded-full w-3 h-3 animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <span className="dot bg-[#514437] rounded-full w-3 h-3 animate-bounce" style={{ animationDelay: '0.2s' }} />
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Voice selector */}
        <div className="flex flex-row justify-center mb-6">
          <div className="relative inline-block">
            <select
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
              className="rounded-xl bg-[#514437] px-6 py-3 pr-10 text-white text-base font-medium w-56 shadow transition focus:outline-none appearance-none"
            >
              {VOICES.map((voice) => (
                <option key={voice} value={voice}>
                  {voice.charAt(0).toUpperCase() + voice.slice(1)}
                </option>
              ))}
            </select>
            <svg
              className="w-4 h-4 text-white pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Control buttons */}
        <div className="flex flex-row justify-center">
          <button
            onClick={handleMuteClick}
            className="rounded-l-xl bg-[#514437] px-8 py-3 text-white text-sm font-medium shadow hover:shadow-lg transition flex items-center border border-black w-42"
          >
            {uiState === 'CONVERSATION_NOT_STARTED' || uiState === 'USER_SPEAKING' ? (
              <Mic className="w-5 h-5 mr-1" />
            ) : (
              <MicOff className="w-5 h-5 mr-1" />
            )}
            <span>{muteButtonLabel}</span>
          </button>
          <button
            onClick={handleEndClick}
            className="rounded-r-xl bg-[#514437] px-8 py-3 text-white text-sm font-medium shadow hover:shadow-lg transition flex items-center border border-black w-42"
          >
            <CircleStop className="w-5 h-5 mr-2 text-red-600" />
            <span>End Call</span>
          </button>
        </div>
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef} controls autoPlay style={{ display: 'none' }} />

      {/* Latency chart */}
      <div className="flex justify-center w-full px-4">
        <canvas ref={latencyCanvasRef} className="max-w-3xl w-full bg-white rounded shadow" />
      </div>
    </main>
  )
}

// ============= Page component =============
export default function PlaygroundPage() {
  return (
    <>
      <Navbar />
      <Head>
        <title>Kalpa Labs - Real-Time Conversation</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Playfair+Display:wght@600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/playground/realtime_style.css" />
      </Head>
      <RealtimePlayground />
    </>
  )
} 