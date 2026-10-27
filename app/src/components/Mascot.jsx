import React, { useState, useEffect, useRef } from 'react';
import mascotFrames from '../assets/mascot-frames.webp';

const FRAME_INDEX = {
  idle: 0,
  wink: 1,
  crouch: 2,
  jump: 3,
  land: 4,
  wave: 5,
  sit: 6,
  sleep: 7,
};

const VERTICAL_OFFSETS = {
  idle: 0.995,
  wink: 0.995,
  crouch: 0.995,
  jump: 0.995,
  land: 0.918,
  wave: 0.952,
  sit: 0.584,
  sleep: 0.584,
};

const TOTAL_STEPS = 7; // 8 frames total: 0 to 7

export default function Mascot({ sectionId }) {
  const [frame, setFrame] = useState('sit');
  const [speech, setSpeech] = useState(null);
  const isBusyRef = useRef(false);
  const idleTimerRef = useRef(null);

  // Entrance animation: drop in and land on the rule line, then relax into sitting pose
  useEffect(() => {
    isBusyRef.current = true;
    setFrame('land');
    const timer1 = setTimeout(() => {
      setFrame('sit');
      isBusyRef.current = false;
    }, 380);

    return () => clearTimeout(timer1);
  }, []);

  // Idle sleep detector (20s of inactivity -> doze off)
  useEffect(() => {
    const resetIdle = () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (frame === 'sleep') {
        setFrame('sit');
        setSpeech('Awake! ✨');
        setTimeout(() => setSpeech(null), 1200);
      }
      idleTimerRef.current = setTimeout(() => {
        if (!isBusyRef.current) {
          setFrame('sleep');
          setSpeech('Zzz...');
        }
      }, 20000);
    };

    const events = ['pointermove', 'keydown', 'scroll', 'touchstart'];
    events.forEach((ev) => window.addEventListener(ev, resetIdle, { passive: true }));
    resetIdle();

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      events.forEach((ev) => window.removeEventListener(ev, resetIdle));
    };
  }, [frame]);

  // Periodic random wink every 9.5s
  useEffect(() => {
    const winkInterval = setInterval(() => {
      if (frame === 'sit' && !isBusyRef.current) {
        setFrame('wink');
        setTimeout(() => {
          if (!isBusyRef.current) setFrame('sit');
        }, 280);
      }
    }, 9500);

    return () => clearInterval(winkInterval);
  }, [frame]);

  // Wave on hover or tap
  const handleInteraction = () => {
    if (isBusyRef.current) return;
    isBusyRef.current = true;
    setFrame('wave');
    setSpeech('Hey there! 👋');

    setTimeout(() => {
      setSpeech(null);
      setFrame('sit');
      isBusyRef.current = false;
    }, 1200);
  };

  const bgPercent = (FRAME_INDEX[frame] / TOTAL_STEPS) * 100;
  const vertOffset = VERTICAL_OFFSETS[frame] || 0.584;

  return (
    <div className="mascot-perch" aria-hidden="false">
      <div
        className="mascot"
        onMouseEnter={handleInteraction}
        onClick={handleInteraction}
        title="Satyabrata's perched mascot avatar (click or hover to wave!)"
        style={{ originY: 1 }}
      >
        {/* Cartoon Speech Bubble */}
        {speech && (
          <div className="mascot-speech-bubble" aria-live="polite">
            {speech}
          </div>
        )}

        {/* 8-Frame Comic Sprite */}
        <div
          className="mascot-frame"
          style={{
            backgroundImage: `url(${mascotFrames})`,
            backgroundPosition: `${bgPercent}% 0`,
            top: `calc(var(--mascot-h) * -${vertOffset})`,
            transition: 'top 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>
    </div>
  );
}
