"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type FC,
  type ReactNode,
} from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

function cx(...parts: Array<string | undefined | false | null>): string {
  return parts.filter(Boolean).join(" ");
}

export interface FeatureRevealTriggerRange {
  start?: string;
  end?: string;
}

export interface FeatureRevealTriggers {
  no?: FeatureRevealTriggerRange;
  title?: FeatureRevealTriggerRange;
  content?: FeatureRevealTriggerRange;
  img?: FeatureRevealTriggerRange;
}

export interface FeatureRevealProperty {
  image?: string;
  imgClass?: string;
  /** Custom visual for the reveal slot when there's no image URL (e.g. an icon). */
  visual?: ReactNode;
  no?: string | number;
  number?: string | number;
  titleClass?: string;
  title?: string;
  contentClass?: string;
  paragraphs?: string[];
  triggers?: FeatureRevealTriggers;
}

export interface HorizontalFeatureRevealProps {
  features: FeatureRevealProperty[];
  className?: string;
  style?: CSSProperties;
  "aria-label"?: string;
}

// Fallback scroll ranges for panels that don't override via `triggers`.
// Expressed against the panel itself while it slides through the pinned
// viewport (see `containerAnimation` below), staggered so number -> title
// -> copy -> image reveal in sequence rather than all at once.
const DEFAULT_TRIGGERS: Required<FeatureRevealTriggers> = {
  no: { start: "left 92%", end: "left 60%" },
  title: { start: "left 85%", end: "left 35%" },
  content: { start: "left 78%", end: "left 25%" },
  img: { start: "left 95%", end: "left 40%" },
};

const HorizontalFeatureReveal: FC<HorizontalFeatureRevealProps> = ({
  features,
  className,
  style,
  "aria-label": ariaLabel = "Feature reveal",
}) => {
  const uid = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useGSAP(
    () => {
      const container = containerRef.current;
      const track = trackRef.current;
      const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
      if (!container || !track || panels.length === 0 || reducedMotion) return;

      const splits: SplitText[] = [];
      const triggers: ScrollTrigger[] = [];

      // Translate the track horizontally, driven by vertical scroll while
      // the section is pinned — the classic GSAP horizontal-scroll pattern.
      const scrollTween = gsap.to(track, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          end: () => "+=" + (track.scrollWidth - container.clientWidth),
          invalidateOnRefresh: true,
        },
      });
      if (scrollTween.scrollTrigger) triggers.push(scrollTween.scrollTrigger);

      panels.forEach((panel, i) => {
        const feature = features[i];
        const t: Required<FeatureRevealTriggers> = {
          no: feature.triggers?.no ?? DEFAULT_TRIGGERS.no,
          title: feature.triggers?.title ?? DEFAULT_TRIGGERS.title,
          content: feature.triggers?.content ?? DEFAULT_TRIGGERS.content,
          img: feature.triggers?.img ?? DEFAULT_TRIGGERS.img,
        };

        const noEl = panel.querySelector<HTMLElement>("[data-feature-no]");
        const titleEl = panel.querySelector<HTMLElement>(
          "[data-feature-title]",
        );
        const contentEl = panel.querySelector<HTMLElement>(
          "[data-feature-content]",
        );
        const imgEl = panel.querySelector<HTMLElement>("[data-feature-img]");

        // Every nested ScrollTrigger below points at `scrollTween` via
        // `containerAnimation` so its start/end are measured along the
        // horizontal track instead of the page's vertical scroll.
        if (noEl) {
          gsap.set(noEl, { opacity: 0, y: 20 });
          const st = gsap.to(noEl, {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              containerAnimation: scrollTween,
              trigger: panel,
              start: t.no.start,
              end: t.no.end,
              scrub: true,
            },
          }).scrollTrigger;
          if (st) triggers.push(st);
        }

        if (titleEl) {
          const split = new SplitText(titleEl, { type: "words,chars" });
          splits.push(split);
          gsap.set(split.chars, { opacity: 0, yPercent: 70 });
          const st = gsap.to(split.chars, {
            opacity: 1,
            yPercent: 0,
            stagger: 0.02,
            ease: "power3.out",
            scrollTrigger: {
              containerAnimation: scrollTween,
              trigger: panel,
              start: t.title.start,
              end: t.title.end,
              scrub: true,
            },
          }).scrollTrigger;
          if (st) triggers.push(st);
        }

        if (contentEl) {
          gsap.set(contentEl, { opacity: 0, y: 24 });
          const st = gsap.to(contentEl, {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              containerAnimation: scrollTween,
              trigger: panel,
              start: t.content.start,
              end: t.content.end,
              scrub: true,
            },
          }).scrollTrigger;
          if (st) triggers.push(st);
        }

        if (imgEl) {
          gsap.set(imgEl, {
            opacity: 0,
            scale: 1.12,
            clipPath: "inset(12% round 0.75rem)",
          });
          const st = gsap.to(imgEl, {
            opacity: 1,
            scale: 1,
            clipPath: "inset(0% round 0.75rem)",
            ease: "power2.out",
            scrollTrigger: {
              containerAnimation: scrollTween,
              trigger: panel,
              start: t.img.start,
              end: t.img.end,
              scrub: true,
            },
          }).scrollTrigger;
          if (st) triggers.push(st);
        }
      });

      ScrollTrigger.refresh();

      return () => {
        triggers.forEach((tr) => tr.kill());
        splits.forEach((s) => s.revert());
      };
    },
    { scope: containerRef, dependencies: [features.length, reducedMotion] },
  );

  return (
    <section
      ref={containerRef}
      aria-label={ariaLabel}
      style={style}
      className={cx("relative w-full overflow-hidden", className)}
    >
      <div
        ref={trackRef}
        className={cx(
          "flex h-screen w-full will-change-transform",
          reducedMotion && "h-auto flex-col overflow-visible",
        )}
      >
        {features.map((feature, i) => (
          <div
            key={`${uid}-${i}`}
            ref={(el) => {
              panelRefs.current[i] = el;
            }}
            data-feature-panel
            className={cx(
              "flex h-screen w-screen flex-shrink-0 flex-col justify-center gap-8 px-[6vw] py-[6vh] sm:flex-row sm:items-center",
              reducedMotion && "h-auto min-h-screen w-full",
            )}
          >
            <div
              className={cx(
                "flex w-full flex-col justify-center gap-4",
                feature.image || feature.visual ? "sm:w-1/2" : "sm:w-full",
              )}
            >
              {(feature.no ?? feature.number) !== undefined && (
                <p
                  data-feature-no
                  className="font-mono text-sm font-bold uppercase tracking-[0.3em] text-neutral-500"
                >
                  {String(feature.no ?? feature.number).padStart(2, "0")}
                </p>
              )}
              {feature.title && (
                <h2
                  data-feature-title
                  className={cx(
                    "text-[clamp(2rem,6vw,4.5rem)] font-black uppercase leading-[0.95] tracking-tight",
                    feature.titleClass,
                  )}
                >
                  {feature.title}
                </h2>
              )}
              {feature.paragraphs && feature.paragraphs.length > 0 && (
                <div
                  data-feature-content
                  className={cx(
                    "max-w-[60ch] space-y-3 text-base leading-relaxed sm:text-lg",
                    feature.contentClass,
                  )}
                >
                  {feature.paragraphs.map((p, pi) => (
                    <p key={pi}>{p}</p>
                  ))}
                </div>
              )}
            </div>

            {(feature.image || feature.visual) && (
              <div
                data-feature-img
                className="flex w-full items-center justify-center sm:w-1/2"
              >
                {feature.image ? (
                  <img
                    src={feature.image}
                    alt={feature.title ?? `Feature ${i + 1}`}
                    className={cx(
                      "max-h-[60vh] w-full rounded-xl object-cover",
                      feature.imgClass,
                    )}
                  />
                ) : (
                  feature.visual
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalFeatureReveal;
