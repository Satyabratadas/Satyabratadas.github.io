import { useEffect, useRef, useCallback, useState } from 'react';

/**
 * useSounds
 * Low-latency mechanical keycap audio engine using Web Audio API.
 * Uses decoded audio buffers with slight randomized detuning
 * so rapid clicks sound just like authentic mechanical switches.
 */
export function useSounds() {
  const audioCtxRef = useRef(null);
  const pressBufferRef = useRef(null);
  const releaseBufferRef = useRef(null);
  const boomBufferRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const initAudio = async () => {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

        const [pressRes, releaseRes, boomRes] = await Promise.all([
          fetch(`${base}/assets/keycap-sounds/press.mp3`).catch(() => null),
          fetch(`${base}/assets/keycap-sounds/release.mp3`).catch(() => null),
          fetch(`${base}/assets/sounds/vine-boom.mp3`).catch(() => null),
        ]);

        if (pressRes && pressRes.ok) {
          const buf = await pressRes.arrayBuffer();
          if (!isCancelled) pressBufferRef.current = await ctx.decodeAudioData(buf);
        }

        if (releaseRes && releaseRes.ok) {
          const buf = await releaseRes.arrayBuffer();
          if (!isCancelled) releaseBufferRef.current = await ctx.decodeAudioData(buf);
        }

        if (boomRes && boomRes.ok) {
          const buf = await boomRes.arrayBuffer();
          if (!isCancelled) boomBufferRef.current = await ctx.decodeAudioData(buf);
        }
      } catch (err) {
        console.warn('Audio preloading notice:', err);
      }
    };

    initAudio();

    return () => {
      isCancelled = true;
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const getAudioContext = useCallback(() => {
    const ctx = audioCtxRef.current;
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    return ctx;
  }, []);

  const playBuffer = useCallback((buffer, detuneOffset = 0, volume = 0.4) => {
    if (isMuted || !buffer) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      // Slight pitch variance creates realistic tactile switch variety
      source.detune.value = detuneOffset + (Math.random() * 160 - 80);
      const gainNode = ctx.createGain();
      gainNode.gain.value = volume;
      source.connect(gainNode);
      gainNode.connect(ctx.destination);
      source.start(0);
    } catch (e) {
      console.warn('Audio playback error:', e);
    }
  }, [getAudioContext, isMuted]);

  const playPressSound = useCallback(() => {
    playBuffer(pressBufferRef.current, 0, 0.45);
  }, [playBuffer]);

  const playReleaseSound = useCallback(() => {
    playBuffer(releaseBufferRef.current, 0, 0.35);
  }, [playBuffer]);

  const playVineBoom = useCallback(() => {
    playBuffer(boomBufferRef.current, 0, 0.6);
  }, [playBuffer]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  return {
    playPressSound,
    playReleaseSound,
    playVineBoom,
    isMuted,
    toggleMute,
  };
}
