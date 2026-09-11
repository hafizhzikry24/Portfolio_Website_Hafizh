import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import HeartMessage from "./HeartMessage";

import bgImg from "../../assets/assets-gf/foto/bg.jpg";
import photo1 from "../../assets/assets-gf/foto/foto1.jpg";
import photo2 from "../../assets/assets-gf/foto/foto2.jpg";
import photo3 from "../../assets/assets-gf/foto/foto3.jpg";
import photo4 from "../../assets/assets-gf/foto/foto4.jpg";

import cover1 from "../../assets/assets-gf/cover/cover1.jpeg";
import cover2 from "../../assets/assets-gf/cover/cover2.jpeg";
import cover3 from "../../assets/assets-gf/cover/cover3.jpeg";
import cover4 from "../../assets/assets-gf/cover/cover4.jpeg";


import song1 from "../../assets/assets-gf/lagu/Lagu1.mp3";
import song2 from "../../assets/assets-gf/lagu/lagu2.mp3";
import song3 from "../../assets/assets-gf/lagu/lagu3.mp3";
import song4 from "../../assets/assets-gf/lagu/lagu4.mp3";


const GF_NAME = "Keisha";

interface Song {
  src: string;
  title: string;
  artist: string;
  cover: string;
}

// TODO: swap in the real title/artist for each track — placeholders for now.
const PLAYLIST: Song[] = [
  { src: song1, title: "Karolina", artist: "Sore Ze Band", cover: cover1 },
  { src: song2, title: "The Art Of Chasing You", artist: "Magnolia Celebration", cover: cover2 },
  { src: song3, title: "One Less Lonely Girl", artist: "Justin Bieber", cover: cover3 },
  { src: song4, title: "Transform (feat. Charlotte Day Wilson)", artist: "Daniel Caesar", cover: cover4 },
];

const PHOTOS = [
  { src: photo1, caption: "you" },
  { src: photo2, caption: "are" },
  { src: photo3, caption: "so beautiful" },
  { src: photo4, caption: "🤍" },
];

const PETAL_COUNT = 20;

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return "0:00";
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

// Fades a step's children in, staggered, right after it mounts.
const RevealBlock: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={`gr-block ${visible ? "gr-in-view" : ""} ${className ?? ""}`}>{children}</div>
  );
};

// Little heart button that advances to the next step (click, not scroll).
const NextSectionButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button type="button" className="gr-next-btn" aria-label="Go to next step" onClick={onClick}>
    🤍
  </button>
);

/**
 * A gift-reveal experience: tap to open, confirm (the "no" button dodges
 * away — you can't actually decline), then a personalized love-letter flow
 * unlocks with a song picker and a photo memory grid. Adapted from a
 * standalone single-page site into one section sitting between the curtain
 * hero and the heart message: the cover/popup overlays are scoped to this
 * section (not the whole viewport/page) so they don't hide the section
 * above on load, and there's no global scroll-lock — normal scrolling
 * carries you through it like the rest of the page.
 */
type Step = "cover" | "hero" | "songs" | "photos" | "final" | "heart";

// "cover" isn't reachable via back — that's the popup's own gate, not a step
// to revisit — so back from "hero" just stays on "hero".
const STEP_ORDER: Step[] = ["cover", "hero", "songs", "photos", "final", "heart"];

const GiftReveal: React.FC = () => {
  const [step, setStep] = useState<Step>("cover");
  const [popupOpen, setPopupOpen] = useState(false);
  const [noBtnPos, setNoBtnPos] = useState<{ top: number; left: number } | null>(null);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const popupBoxRef = useRef<HTMLDivElement>(null);
  const noBtnRef = useRef<HTMLButtonElement>(null);

  const petals = useMemo(
    () =>
      Array.from({ length: PETAL_COUNT }, () => ({
        left: Math.random() * 100,
        size: Math.random() * 8 + 6,
        duration: Math.random() * 6 + 6,
        delay: Math.random() * 7,
      })),
    [],
  );

  const currentSong = PLAYLIST[currentSongIndex];

  const playSongAt = useCallback((index: number) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
    // Give React a tick to commit the new <audio src> before playing it.
    requestAnimationFrame(() => {
      audioRef.current?.play().catch(() => {});
    });
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, []);

  const nextSong = useCallback(() => {
    playSongAt((currentSongIndex + 1) % PLAYLIST.length);
  }, [currentSongIndex, playSongAt]);

  const prevSong = useCallback(() => {
    playSongAt((currentSongIndex - 1 + PLAYLIST.length) % PLAYLIST.length);
  }, [currentSongIndex, playSongAt]);

  const handleSeek = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const audio = audioRef.current;
      if (!audio || !duration) return;
      audio.currentTime = (Number(event.target.value) / 100) * duration;
    },
    [duration],
  );

  const handleConfirmYes = useCallback(() => {
    setPopupOpen(false);
    setStep("hero");
    playSongAt(0);
  }, [playSongAt]);

  const goBack = useCallback(() => {
    setStep((current) => {
      const idx = STEP_ORDER.indexOf(current);
      return STEP_ORDER[Math.max(idx - 1, 1)] ?? current;
    });
  }, []);

  const handleDodgeNo = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    const box = popupBoxRef.current;
    const btn = noBtnRef.current;
    if (!box || !btn) return;
    const maxX = Math.max(box.clientWidth - btn.offsetWidth - 20, 0);
    const maxY = Math.max(box.clientHeight - btn.offsetHeight - 20, 0);
    setNoBtnPos({
      left: Math.random() * maxX + 10,
      top: Math.random() * maxY + 10,
    });
  }, []);

  return (
    <section className="gr-section" aria-label="A surprise for you">
      <style>{`
        .gr-section {
          --gr-bg-dark: #1f0b17;
          --gr-text-muted: #d4a5b9;
          --gr-accent: #e57373;
          position: relative;
          height: 100vh;
          overflow: hidden;
          color: #fce4ec;
          font-family: Montserrat, ui-sans-serif, system-ui, sans-serif;
        }

        .gr-serif { font-family: "Cormorant Garamond", serif; font-weight: normal; }

        .gr-petals {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100vh;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
        }
        .gr-petal {
          position: absolute;
          top: -10vh;
          background-color: #ffb7c5;
          border-radius: 50% 0 50% 0;
          opacity: 0.4;
          animation-name: grFall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes grFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          20% { opacity: 0.6; }
          100% { transform: translateY(120vh) rotate(360deg); opacity: 0; }
        }

        .gr-cover {
          position: absolute;
          inset: 0;
          height: 100vh;
          background: var(--gr-bg-dark);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 5;
          text-align: center;
        }
        .gr-gift-btn {
          background: none;
          border: none;
          color: inherit;
          font-size: 90px;
          line-height: 1;
          padding: 0;
          cursor: pointer;
          animation: grPulse 1.5s infinite;
        }
        @keyframes grPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.08); filter: drop-shadow(0 0 20px rgba(229, 115, 115, 0.4)); }
          100% { transform: scale(1); }
        }
        .gr-tap-text {
          margin-top: 15px;
          font-size: 11px;
          color: var(--gr-text-muted);
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        .gr-popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 200;
          animation: grFadeIn 0.3s ease;
        }
        @keyframes grFadeIn { from { opacity: 0; } to { opacity: 1; } }
        .gr-popup-box {
          position: relative;
          background: var(--gr-bg-dark);
          border: 2px solid var(--gr-accent);
          padding: 40px 20px;
          border-radius: 15px;
          text-align: center;
          width: 90%;
          max-width: 450px;
          min-height: 250px;
          box-shadow: 0 0 25px rgba(229, 115, 115, 0.4);
        }
        .gr-popup-box h3 { color: #fff; font-size: 24px; margin: 0 0 40px; }
        .gr-popup-buttons {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }
        .gr-popup-btn {
          padding: 12px 24px;
          border: none;
          border-radius: 25px;
          font-family: Montserrat, sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease, left 0.2s ease, top 0.2s ease;
        }
        .gr-btn-yes { background: var(--gr-accent); color: #fff; }
        .gr-btn-yes:hover { background: #ef9a9a; }
        .gr-btn-no { background: #555; color: #fff; }

        .gr-content {
          position: relative;
          height: 100%;
          background:
            linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.85)),
            url(${bgImg}) center / cover fixed no-repeat;
        }

        .gr-block {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 60px 20px 170px;
          max-width: 680px;
          margin: 0 auto;
          height: 100%;
          box-sizing: border-box;
          overflow-y: auto;
          position: relative;
        }
        .gr-block > * {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .gr-block.gr-in-view > * { opacity: 1; transform: translateY(0); }
        .gr-block.gr-in-view > *:nth-child(2) { transition-delay: 0.1s; }
        .gr-block.gr-in-view > *:nth-child(3) { transition-delay: 0.2s; }
        .gr-block.gr-in-view > *:nth-child(4) { transition-delay: 0.3s; }
        .gr-block.gr-in-view > *:nth-child(5) { transition-delay: 0.4s; }
        .gr-block.gr-in-view > *:nth-child(6) { transition-delay: 0.5s; }

        .gr-subtitle {
          font-size: 10px;
          color: var(--gr-text-muted);
          letter-spacing: 4px;
          text-transform: uppercase;
          margin: 0 0 5px;
        }
        .gr-title-main { font-size: 38px; margin: 0 0 5px; color: #fff; line-height: 1.1; }
        .gr-title-sub { font-size: 28px; margin: 0 0 5px; color: #fff; }
        .gr-text-body { font-size: 14px; line-height: 1.6; color: #dcdcdc; max-width: 650px; font-weight: 300; }

        .gr-portrait {
          width: 140px;
          height: 140px;
          object-fit: cover;
          border-radius: 50%;
          border: 3px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 0 25px rgba(229, 115, 115, 0.4);
          margin: 15px 0;
        }
        .gr-flower-emoji { font-size: 24px; margin-top: 10px; }

        .gr-playlist-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          width: 100%;
          margin-top: 15px;
        }
        .gr-playlist-item {
          background: none;
          border: none;
          cursor: pointer;
          color: inherit;
          padding: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .gr-playlist-item img { width: 100%; aspect-ratio: 1 / 1; object-fit: cover; border-radius: 10px; transition: transform 0.3s; }
        .gr-playlist-item:hover img { transform: scale(1.05); }
        .gr-playlist-title { font-size: 14px; margin: 8px 0 0; color: #fff; font-family: Montserrat, sans-serif; }
        .gr-playlist-artist { font-size: 11px; margin: 0; color: var(--gr-text-muted); }

        .gr-photo-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          width: 100%;
          margin-top: 15px;
        }
        .gr-photo-item img {
          width: 100%;
          aspect-ratio: 1 / 1;
          object-fit: cover;
          border-radius: 8px;
          filter: grayscale(60%) sepia(20%) brightness(0.9);
          transition: filter 0.5s ease;
        }
        .gr-photo-item:hover img { filter: grayscale(0%); }
        .gr-photo-caption { font-family: "Cormorant Garamond", serif; font-style: italic; font-size: 14px; margin: 5px 0 0; color: var(--gr-text-muted); }

        .gr-flower-row { font-size: 24px; letter-spacing: 10px; margin-bottom: 5px; }
        .gr-final-body { max-width: 600px; }
        .gr-signature { margin-top: 10px; font-style: italic; color: var(--gr-text-muted); font-size: 16px; }

        .gr-next-btn {
          margin-top: 20px;
          padding: 10px 22px;
          background: transparent;
          border: 2px solid var(--gr-accent);
          color: #fce4ec;
          font-size: 16px;
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 0 15px rgba(229, 115, 115, 0.2);
        }
        .gr-next-btn:hover {
          background: var(--gr-accent);
          box-shadow: 0 0 25px rgba(229, 115, 115, 0.6);
          transform: translateY(-3px);
        }

        .gr-back-btn {
          position: absolute;
          top: 16px;
          left: 16px;
          z-index: 10;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: rgba(0, 0, 0, 0.35);
          color: #fce4ec;
          font-size: 20px;
          line-height: 1;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(6px);
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .gr-back-btn:hover { background: rgba(0, 0, 0, 0.55); transform: translateX(-2px); }

        .gr-music-widget {
          position: fixed;
          bottom: 20px;
          left: 20px;
          background: rgba(15, 5, 10, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 15px;
          padding: 12px;
          width: 230px;
          backdrop-filter: blur(15px);
          z-index: 60;
          display: flex;
          flex-direction: column;
          gap: 8px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        .gr-music-top { display: flex; align-items: center; gap: 10px; }
        .gr-music-top img { width: 38px; height: 38px; border-radius: 5px; object-fit: cover; flex-shrink: 0; }
        .gr-music-info { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .gr-music-title { font-size: 12px; font-weight: 500; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .gr-music-artist { font-size: 9px; color: var(--gr-text-muted); letter-spacing: 1px; }
        .gr-progress-wrapper input[type="range"] {
          appearance: none; -webkit-appearance: none;
          width: 100%; height: 4px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px; outline: none; cursor: pointer;
        }
        .gr-progress-wrapper input[type="range"]::-webkit-slider-thumb {
          appearance: none; -webkit-appearance: none;
          width: 10px; height: 10px; border-radius: 50%;
          background: #fce4ec;
          box-shadow: 0 0 10px rgba(229, 115, 115, 0.5);
        }
        .gr-time-display { display: flex; justify-content: space-between; font-size: 9px; color: var(--gr-text-muted); margin-top: 4px; letter-spacing: 1px; }
        .gr-controls { display: flex; justify-content: center; align-items: center; gap: 16px; }
        .gr-controls button { background: none; border: none; color: #fce4ec; font-size: 15px; cursor: pointer; padding: 2px; }
        .gr-controls button:hover { color: var(--gr-accent); }

        @media (max-width: 640px) {
          .gr-title-main { font-size: 30px; }
          .gr-title-sub { font-size: 22px; }
          .gr-photo-grid { grid-template-columns: repeat(2, 1fr); }
          .gr-playlist-grid { gap: 10px; }
          .gr-music-widget { left: 50%; transform: translateX(-50%); width: 88%; max-width: 300px; }
        }
      `}</style>

      <div className="gr-petals" aria-hidden="true">
        {petals.map((p, i) => (
          <span
            key={i}
            className="gr-petal"
            style={{
              left: `${p.left}vw`,
              width: p.size,
              height: p.size,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {step === "cover" && (
        <div className="gr-cover">
          <button
            type="button"
            className="gr-gift-btn"
            onClick={() => setPopupOpen(true)}
            aria-label="Open surprise"
          >
            🤍
          </button>
          <p className="gr-tap-text">surprise untuk kesayangan aku🤍</p>
        </div>
      )}

      {popupOpen && (
        <div className="gr-popup-overlay">
          <div className="gr-popup-box" ref={popupBoxRef}>
            <h3 className="gr-serif">Bener bener mau buka surprisenya nihh 🥺</h3>
            <div className="gr-popup-buttons">
              <button type="button" className="gr-popup-btn gr-btn-yes" onClick={handleConfirmYes}>
                Iyaaa dongggg 🤍
              </button>
              <button
                type="button"
                ref={noBtnRef}
                className="gr-popup-btn gr-btn-no"
                style={
                  noBtnPos
                    ? { position: "absolute", left: noBtnPos.left, top: noBtnPos.top }
                    : undefined
                }
                onClick={handleDodgeNo}
              >
                Nggak ah skip dulu 😜
              </button>
            </div>
          </div>
        </div>
      )}

      {step !== "cover" && (
        <div className="gr-content">
          {step !== "hero" && (
            <button type="button" className="gr-back-btn" onClick={goBack} aria-label="Go back">
              ←
            </button>
          )}

          {step === "hero" && (
            <RevealBlock className="gr-hero">
              <p className="gr-subtitle">sebuah ucapan cinta untuk pujaan hatiku🤍</p>
              <h1 className="gr-title-main gr-serif">
                Untukmu
                <br />
                Pemegang Hatiku
              </h1>
              <h1 className="gr-title-main gr-serif">{GF_NAME}</h1>
              <img src={photo1} alt={GF_NAME} className="gr-portrait" />
              <p className="gr-text-body">
                Setiap kelopak bunga menyimpan bisikan tentang betapa berartinya dirimu bagiku.
              </p>
              <div className="gr-flower-emoji">🌸</div>
              <NextSectionButton onClick={() => setStep("songs")} />
            </RevealBlock>
          )}

          {step === "songs" && (
            <RevealBlock className="gr-songs">
              <p className="gr-subtitle">our melodies</p>
              <h2 className="gr-title-sub gr-serif">Lagu Yang Mengingatkanku Pada Dirimu</h2>
              <p className="gr-subtitle">klik cover art untuk ganti lagu</p>
              <div className="gr-playlist-grid">
                {PLAYLIST.map((song, i) => (
                  <button
                    type="button"
                    key={song.title}
                    className="gr-playlist-item"
                    onClick={() => playSongAt(i)}
                  >
                    <img src={song.cover} alt={`Cover ${song.title}`} />
                    <p className="gr-playlist-title">{song.title}</p>
                    <p className="gr-playlist-artist">{song.artist}</p>
                  </button>
                ))}
              </div>
              <NextSectionButton onClick={() => setStep("photos")} />
            </RevealBlock>
          )}

          {step === "photos" && (
            <RevealBlock className="gr-photos">
              <p className="gr-subtitle">
                Waktu terhenti di balik lensa, namun rasanya tak pernah pudar oleh masa.
              </p>
              <h2 className="gr-title-sub gr-serif">
                Baby You&apos;re
                <br />
                Divine
              </h2>
              <div className="gr-photo-grid">
                {PHOTOS.map((photo, i) => (
                  <div className="gr-photo-item" key={i} tabIndex={0}>
                    <img src={photo.src} alt={photo.caption} />
                    <p className="gr-photo-caption">{photo.caption}</p>
                  </div>
                ))}
              </div>
              <NextSectionButton onClick={() => setStep("final")} />
            </RevealBlock>
          )}

          {step === "final" && (
            <RevealBlock className="gr-final">
              <div className="gr-flower-row">🌸🌺🌹</div>
              <p className="gr-subtitle">always &amp; forever</p>
              <h1 className="gr-title-sub gr-serif">
                You Are Loved
                <br />
                Beyond Words
              </h1>
              <p className="gr-text-body gr-final-body">
                No matter where life takes us, know that somewhere in the universe, there is a
                garden blooming with every feeling I have ever held for you. You deserve the
                world. You deserve all the flowers. You deserve everything.
              </p>
              <p className="gr-signature gr-serif">made with love, just for you 🤍</p>
              <NextSectionButton onClick={() => setStep("heart")} />
            </RevealBlock>
          )}

          {step === "heart" && <HeartMessage />}

          <div className="gr-music-widget">
            <div className="gr-music-top">
              <img src={currentSong.cover} alt="Album art" />
              <div className="gr-music-info">
                <span className="gr-music-title">{currentSong.title}</span>
                <span className="gr-music-artist">{currentSong.artist}</span>
              </div>
            </div>

            <div className="gr-progress-wrapper">
              <input
                type="range"
                min={0}
                max={100}
                step={0.1}
                value={duration ? (currentTime / duration) * 100 : 0}
                onChange={handleSeek}
                aria-label="Seek"
              />
              <div className="gr-time-display">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="gr-controls">
              <button type="button" onClick={prevSong} aria-label="Previous song">
                ⏮
              </button>
              <button type="button" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
                {isPlaying ? "⏸" : "▶"}
              </button>
              <button type="button" onClick={nextSong} aria-label="Next song">
                ⏭
              </button>
            </div>

            <audio
              ref={audioRef}
              src={currentSong.src}
              onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
              onEnded={nextSong}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default GiftReveal;
