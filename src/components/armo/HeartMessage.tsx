import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface HeartPoint {
  x: number;
  y: number;
  boost: number;
  word: string;
}

interface HeartWordStyle extends HeartPoint {
  delay: number;
  hue: number;
  light: number;
  opacity: number;
  rot: number;
}

const WORDS = ["I love you", "love you", "forever", "my heart", "<3"];

const LOG_LINES = [
  "[system] Initializing HEART_PROTOCOL_v2.0...",
  "[status] Loading memory fragments...",
  "[fonts] Preloading custom heart font for you...",
  "[ready] One message is waiting.",
];

// Points inside the implicit heart curve (x^2+y^2-1)^3 - x^2*y^3 <= 0,
// mapped to percentage coordinates for the word-cloud heart shape.
function buildHeartPoints(): HeartPoint[] {
  const points: HeartPoint[] = [];
  const step = 0.105;
  let index = 0;

  for (let y = 1.35; y >= -1.25; y -= step) {
    for (let x = -1.45; x <= 1.45; x += step) {
      const v = Math.pow(x * x + y * y - 1, 3) - x * x * Math.pow(y, 3);
      if (v <= 0) {
        const px = 50 + x * 31;
        const py = 53 - y * 35;
        const boost = 1 - Math.min(1, Math.hypot(x, y) / 1.55);
        points.push({
          x: px,
          y: py,
          boost,
          word: WORDS[(index + Math.floor(px)) % WORDS.length],
        });
        index += 1;
      }
    }
  }
  return points;
}

/**
 * Interactive "accept the message" reveal — an intro log animates in, and on
 * click the words dissolve and reform as a heart built out of tiny floating
 * words. Adapted as a section (rather than a standalone page): the keyboard
 * shortcut and page-wide `overflow: hidden` from the original were dropped
 * since they don't play well sitting inside a scrollable page — reveal is
 * button-only here, and the tilt/overflow containment is scoped to the
 * section itself.
 */
const HeartMessage: React.FC = () => {
  const points = useMemo(buildHeartPoints, []);
  const [revealed, setRevealed] = useState(false);
  const [wordStyles, setWordStyles] = useState<HeartWordStyle[]>([]);
  const heartRef = useRef<HTMLDivElement>(null);

  const reveal = useCallback(() => {
    setWordStyles(
      points.map((p) => ({
        ...p,
        delay: Math.random() * 900 + p.y * 4,
        hue: 336 + Math.random() * 15,
        light: 50 + p.boost * 34 + Math.random() * 8,
        opacity: 0.56 + p.boost * 0.42,
        rot: Math.random() * 10 - 5,
      })),
    );
    setRevealed(true);
  }, [points]);

  useEffect(() => {
    if (!revealed) return;
    const handleMove = (event: MouseEvent) => {
      const el = heartRef.current;
      if (!el) return;
      const x = (event.clientX / window.innerWidth - 0.5) * 10;
      const y = (event.clientY / window.innerHeight - 0.5) * -8;
      el.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [revealed]);

  return (
    <section className="hm-stage" aria-label="A message for you">
      <style>{`
        .hm-stage {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          display: grid;
          place-items: center;
          perspective: 900px;
          padding: 24px 18px;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          color: #fff7fb;
          background:
            radial-gradient(circle at 50% 45%, rgba(255, 45, 117, 0.16), transparent 34%),
            radial-gradient(circle at 50% 74%, rgba(255, 0, 80, 0.2), transparent 26%),
            linear-gradient(180deg, #09090f, #050508);
        }

        .hm-intro {
          text-align: center;
          z-index: 8;
          transition: opacity 0.45s ease, transform 0.45s ease;
        }

        .hm-intro.hm-hide {
          opacity: 0;
          transform: translateY(16px) scale(0.96);
          pointer-events: none;
        }

        .hm-main-title {
          font-size: clamp(34px, 7vw, 70px);
          font-weight: 900;
          line-height: 1;
          margin: 0;
          text-shadow: 0 0 28px rgba(255, 45, 117, 0.7);
        }

        .hm-log {
          margin: 22px auto 0;
          width: min(560px, 92vw);
          text-align: left;
          font-family: "Cascadia Code", Consolas, monospace;
          font-size: clamp(11px, 2vw, 13px);
          color: rgba(255, 122, 168, 0.9);
          line-height: 1.7;
        }

        .hm-log-line {
          opacity: 0;
          transform: translateY(8px);
          animation: hmLineIn 0.45s ease forwards;
        }

        .hm-log-line:nth-child(2) { animation-delay: 0.45s; }
        .hm-log-line:nth-child(3) { animation-delay: 0.9s; }
        .hm-log-line:nth-child(4) { animation-delay: 1.35s; }

        @keyframes hmLineIn {
          to { opacity: 1; transform: translateY(0); }
        }

        .hm-button {
          margin-top: 22px;
          border: 0;
          border-radius: 10px;
          padding: 13px 24px;
          color: white;
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
          background: linear-gradient(135deg, #ff2d75, #b8003d);
          box-shadow: 0 12px 38px rgba(255, 45, 117, 0.36);
          opacity: 0;
          transform: translateY(10px);
          animation: hmButtonIn 0.45s ease forwards 2s;
        }

        .hm-button:hover {
          transform: translateY(-1px);
          filter: brightness(1.08);
        }

        @keyframes hmButtonIn {
          to { opacity: 1; transform: translateY(0); }
        }

        .hm-heart-wrap {
          position: absolute;
          width: min(92vw, 760px);
          aspect-ratio: 1 / 0.9;
          transform-style: preserve-3d;
          opacity: 0;
          pointer-events: none;
        }

        .hm-heart-wrap.hm-show {
          opacity: 1;
          animation: hmHeartAppear 1.1s ease forwards, hmBeat 1.7s ease-in-out infinite 1.2s;
        }

        @keyframes hmHeartAppear {
          from { transform: rotateX(18deg) scale(0.72); filter: blur(6px); }
          to { transform: rotateX(0deg) scale(1); filter: blur(0); }
        }

        @keyframes hmBeat {
          0%, 100% { scale: 1; }
          14% { scale: 1.035; }
          28% { scale: 1; }
          42% { scale: 1.025; }
          70% { scale: 1; }
        }

        .hm-heart-word {
          position: absolute;
          left: calc(var(--x) * 1%);
          top: calc(var(--y) * 1%);
          font-family: "Cascadia Code", Consolas, monospace;
          font-size: clamp(7px, 1.3vw, 13px);
          white-space: nowrap;
          color: hsl(var(--hue), 100%, var(--light));
          text-shadow:
            0 0 7px rgba(255, 45, 117, 0.85),
            0 0 18px rgba(255, 45, 117, 0.5);
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.2) rotate(var(--rot));
          animation: hmWordIn 0.75s cubic-bezier(.2, .9, .2, 1.15) forwards;
          animation-delay: calc(var(--delay) * 1ms);
        }

        @keyframes hmWordIn {
          to {
            opacity: var(--opacity);
            transform: translate(-50%, -50%) scale(1) rotate(var(--rot));
          }
        }

        .hm-center-text {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          font-size: clamp(34px, 7vw, 72px);
          font-weight: 950;
          text-align: center;
          color: white;
          text-shadow:
            0 0 22px rgba(255, 255, 255, 0.5),
            0 0 46px rgba(255, 45, 117, 0.9);
          opacity: 0;
          transform: scale(0.9);
          animation: hmCenterIn 0.8s ease forwards 1.15s;
          pointer-events: none;
        }

        @keyframes hmCenterIn {
          to { opacity: 1; transform: scale(1); }
        }

        .hm-glow {
          position: absolute;
          left: 50%;
          bottom: 6%;
          width: min(640px, 90vw);
          height: 110px;
          transform: translateX(-50%);
          background: radial-gradient(ellipse, rgba(255, 45, 117, 0.34), transparent 65%);
          filter: blur(18px);
          pointer-events: none;
          opacity: 0.85;
        }

        @media (max-width: 520px) {
          .hm-heart-wrap { width: 106vw; }
          .hm-heart-word { font-size: 7px; }
        }
      `}</style>

      <div className={`hm-intro ${revealed ? "hm-hide" : ""}`}>
        <h2 className="hm-main-title">Love you.</h2>
        <div className="hm-log">
          {LOG_LINES.map((line) => (
            <div className="hm-log-line" key={line}>
              {line}
            </div>
          ))}
        </div>
        <button type="button" className="hm-button" onClick={reveal}>
          ACCEPT MESSAGE
        </button>
      </div>

      <div ref={heartRef} className={`hm-heart-wrap ${revealed ? "hm-show" : ""}`}>
        {wordStyles.map((w, i) => (
          <span
            key={i}
            className="hm-heart-word"
            style={
              {
                "--x": w.x,
                "--y": w.y,
                "--delay": w.delay,
                "--hue": w.hue,
                "--light": `${w.light}%`,
                "--opacity": w.opacity,
                "--rot": `${w.rot}deg`,
              } as React.CSSProperties
            }
          >
            {w.word}
          </span>
        ))}
        {revealed && <div className="hm-center-text">Love you.</div>}
      </div>

      <div className="hm-glow" />
    </section>
  );
};

export default HeartMessage;
