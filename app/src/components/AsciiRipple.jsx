import { useEffect, useRef } from 'react'

const CHARS = [' ', '·', ':', '-', '+', '*', '#', '%', '@']

export default function AsciiRipple({ className = '' }) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const ripplesRef = useRef([])
  const animFrameRef = useRef(null)
  const isVisibleRef = useRef(true)
  const lastSpawnRef = useRef({ x: 0, y: 0, time: 0 })

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let width = 0
    let height = 0
    let time = 0
    const fontSize = 13
    const charWidth = 8
    const charHeight = 13

    const updateSize = () => {
      const rect = container.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      width = rect.width
      height = rect.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }

    updateSize()

    let resizeObserver = null
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        updateSize()
      })
      resizeObserver.observe(container)
    }

    let intersectionObserver = null
    if (typeof IntersectionObserver !== 'undefined') {
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isVisibleRef.current = entry.isIntersecting
          })
        },
        { threshold: 0.05 }
      )
      intersectionObserver.observe(container)
    }

    const spawnRipple = (x, y, amplitude = 0.8, speed = 3.8, waveLength = 75) => {
      ripplesRef.current.push({
        x,
        y,
        radius: 0,
        maxRadius: Math.max(width, height) * 0.95,
        speed,
        waveLength,
        amplitude,
        decay: 0.982
      })
      if (ripplesRef.current.length > 12) {
        ripplesRef.current.shift()
      }
    }

    const initialTimeout = setTimeout(() => {
      if (width > 0 && height > 0) {
        spawnRipple(width * 0.65, height * 0.45, 0.9, 3.2, 85)
      }
    }, 500)

    let lastAmbientTime = Date.now()

    const render = () => {
      if (isVisibleRef.current && width > 0 && height > 0) {
        ctx.clearRect(0, 0, width, height)

        time += 0.02
        const now = Date.now()

        if (now - lastAmbientTime > 4200) {
          lastAmbientTime = now
          const rx = width * (0.35 + Math.random() * 0.4)
          const ry = height * (0.25 + Math.random() * 0.5)
          spawnRipple(rx, ry, 0.55, 2.8, 80)
        }

        const activeRipples = []
        for (let i = 0; i < ripplesRef.current.length; i++) {
          const r = ripplesRef.current[i]
          r.radius += r.speed
          r.amplitude *= r.decay
          if (r.amplitude > 0.015 && r.radius < r.maxRadius) {
            activeRipples.push(r)
          }
        }
        ripplesRef.current = activeRipples

        ctx.font = `${fontSize}px "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace`
        ctx.textBaseline = 'top'

        const cols = Math.ceil(width / charWidth)
        const rows = Math.ceil(height / charHeight)

        for (let r = 0; r < rows; r++) {
          const y = r * charHeight
          for (let c = 0; c < cols; c++) {
            const x = c * charWidth

            let intensity =
              Math.sin(x * 0.015 + time * 0.7) *
              Math.cos(y * 0.018 + time * 0.5) *
              0.12

            for (let i = 0; i < activeRipples.length; i++) {
              const rip = activeRipples[i]
              const dx = x - rip.x
              const dy = y - rip.y
              const dist = Math.hypot(dx, dy)
              const waveDiff = dist - rip.radius

              if (Math.abs(waveDiff) < rip.waveLength) {
                const waveShape = Math.cos((waveDiff / rip.waveLength) * Math.PI * 0.5)
                intensity += waveShape * waveShape * rip.amplitude
              }
            }

            if (intensity <= 0.04) continue

            const clamped = Math.min(Math.max(intensity, 0), 1)
            const charIndex = Math.min(
              Math.floor(clamped * CHARS.length),
              CHARS.length - 1
            )
            const char = CHARS[charIndex]
            if (char === ' ') continue

            if (clamped < 0.22) {
              ctx.fillStyle = 'rgba(6, 182, 212, 0.16)'
            } else if (clamped < 0.45) {
              ctx.fillStyle = 'rgba(34, 211, 238, 0.42)'
            } else if (clamped < 0.72) {
              ctx.fillStyle = 'rgba(56, 189, 248, 0.72)'
            } else {
              ctx.fillStyle = 'rgba(165, 243, 252, 0.95)'
            }

            ctx.fillText(char, x, y)
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(render)
    }

    animFrameRef.current = requestAnimationFrame(render)

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const now = Date.now()

      const dist = Math.hypot(x - lastSpawnRef.current.x, y - lastSpawnRef.current.y)
      if (dist > 32 || now - lastSpawnRef.current.time > 110) {
        lastSpawnRef.current = { x, y, time: now }
        lastAmbientTime = now
        spawnRipple(x, y, 0.7, 3.8, 70)
      }
    }

    const handlePointerDown = (e) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      lastAmbientTime = Date.now()
      spawnRipple(x, y, 1.25, 4.6, 90)
    }

    container.addEventListener('pointermove', handlePointerMove, { passive: true })
    container.addEventListener('pointerdown', handlePointerDown, { passive: true })

    return () => {
      clearTimeout(initialTimeout)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      if (resizeObserver) resizeObserver.disconnect()
      if (intersectionObserver) intersectionObserver.disconnect()
      container.removeEventListener('pointermove', handlePointerMove)
      container.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`ascii-ripple-container ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="ascii-ripple-canvas" />
    </div>
  )
}
