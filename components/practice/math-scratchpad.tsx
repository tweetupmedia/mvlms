'use client'

import { useEffect, useRef, useState } from 'react'
import { Eraser, Pencil } from 'lucide-react'

export default function MathScratchpad() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)
  const [hasMarks, setHasMarks] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return
    const ratio = window.devicePixelRatio || 1
    const bounds = canvas.getBoundingClientRect()
    canvas.width = bounds.width * ratio
    canvas.height = bounds.height * ratio
    context.scale(ratio, ratio)
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.lineWidth = 3
    context.strokeStyle = '#6257e9'
  }, [])

  const point = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return null
    const bounds = canvas.getBoundingClientRect()
    return { x: event.clientX - bounds.left, y: event.clientY - bounds.top }
  }

  const start = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const context = canvasRef.current?.getContext('2d')
    const position = point(event)
    if (!context || !position) return
    drawing.current = true
    canvasRef.current?.setPointerCapture(event.pointerId)
    context.beginPath()
    context.moveTo(position.x, position.y)
    setHasMarks(true)
  }

  const move = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return
    const context = canvasRef.current?.getContext('2d')
    const position = point(event)
    if (!context || !position) return
    context.lineTo(position.x, position.y)
    context.stroke()
  }

  const clear = () => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return
    context.clearRect(0, 0, canvas.width, canvas.height)
    setHasMarks(false)
  }

  return <section className="mt-6 overflow-hidden rounded-2xl border border-[#e9e6f3] bg-[#fcfbff]">
    <div className="flex items-center justify-between border-b border-[#e9e6f3] px-4 py-3">
      <div className="flex items-center gap-2 text-sm font-extrabold text-[#6257e9]"><Pencil size={15} /> Scratchpad</div>
      <button type="button" onClick={clear} disabled={!hasMarks} className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9997aa] transition hover:text-[#6257e9] disabled:cursor-not-allowed disabled:opacity-40"><Eraser size={14} /> Clear</button>
    </div>
    <canvas ref={canvasRef} aria-label="Math scratchpad" className="h-36 w-full touch-none cursor-crosshair bg-white" onPointerDown={start} onPointerMove={move} onPointerUp={() => { drawing.current = false }} onPointerCancel={() => { drawing.current = false }} />
  </section>
}

import type React from 'react'
