"use client";

import styles from "../styles/mascot-animations.module.css";

export function FoxReadingAnimation({ className }: { className?: string }) {
  return (
    <div className={`${styles.mascotWrapper} ${className ?? ""}`} aria-hidden="true">
      <svg
        className={styles.mascotSvg}
        viewBox="0 0 240 220"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Warm Reading Nook Aura */}
        <circle cx="120" cy="110" r="90" fill="rgba(254, 243, 199, 0.65)" className={styles.bookGlowAura} />
        <circle cx="120" cy="110" r="70" fill="rgba(255, 255, 255, 0.85)" />

        {/* Floating Alphabet & Knowledge Glyphs */}
        <g className={styles.floatingGlyph}>
          <circle cx="34" cy="55" r="14" fill="#E0F2FE" />
          <text x="34" y="60" fill="#0284C7" fontSize="13" fontWeight="bold" fontFamily="serif" textAnchor="middle">Aa</text>
        </g>
        <g className={styles.floatingGlyphDelay}>
          <circle cx="205" cy="65" r="14" fill="#FEF3C7" />
          <text x="205" y="70" fill="#D97706" fontSize="13" fontWeight="bold" fontFamily="serif" textAnchor="middle">π</text>
        </g>
        <g className={styles.sparkleStar1}>
          <path d="M190 120 L193 125 L198 127 L193 129 L190 134 L187 129 L182 127 L187 125 Z" fill="#F59E0B" />
        </g>

        {/* Fox Character Group */}
        <g className={styles.heroFloatingGroup}>
          {/* Fluffy Tail */}
          <g className={styles.tailWag}>
            <path
              d="M48 135 C22 110, 12 150, 30 175 C48 195, 78 185, 72 155 Z"
              fill="#E05638"
              stroke="#203354"
              strokeWidth="3"
            />
            <path d="M30 175 C38 185, 54 188, 60 182 C50 170, 44 165, 38 160 Z" fill="#FFFFFF" />
          </g>

          {/* Fox Body */}
          <ellipse cx="120" cy="150" rx="46" ry="40" fill="#E05638" stroke="#203354" strokeWidth="3" />
          <ellipse cx="120" cy="156" rx="28" ry="26" fill="#FFFDF8" />

          {/* Head */}
          <g transform="translate(120 85)">
            <path d="M-36 -32 L-52 -82 L-12 -56 Z" fill="#E05638" stroke="#203354" strokeWidth="3" />
            <path d="M-38 -45 L-46 -72 L-24 -56 Z" fill="#FBBF24" />
            <path d="M36 -32 L52 -82 L12 -56 Z" fill="#E05638" stroke="#203354" strokeWidth="3" />
            <path d="M38 -45 L46 -72 L24 -56 Z" fill="#FBBF24" />

            <path
              d="M-44 -32 C-54 -2, -34 26, 0 34 C34 26, 54 -2, 44 -32 C30 -42, -30 -42, -44 -32 Z"
              fill="#E05638"
              stroke="#203354"
              strokeWidth="3"
            />
            <path
              d="M-40 -18 C-44 14, -24 30, 0 34 C24 30, 44 14, 40 -18 C28 -4, -28 -4, -40 -18 Z"
              fill="#FFFDF8"
              stroke="#203354"
              strokeWidth="2"
            />
            <ellipse cx="-24" cy="8" rx="8" ry="5" fill="#F59E0B" opacity="0.6" />
            <ellipse cx="24" cy="8" rx="8" ry="5" fill="#F59E0B" opacity="0.6" />

            {/* Delighted Reading Eyes */}
            <g className={styles.eyeBlink}>
              <ellipse cx="-16" cy="-4" rx="4.5" ry="6.5" fill="#203354" />
              <circle cx="-14.5" cy="-6" r="2" fill="#FFFFFF" />
              <ellipse cx="16" cy="-4" rx="4.5" ry="6.5" fill="#203354" />
              <circle cx="17.5" cy="-6" r="2" fill="#FFFFFF" />
            </g>

            <polygon points="-5,14 5,14 0,19" fill="#203354" />
            <path d="M-6 24 Q0 28 6 24" stroke="#203354" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>

          {/* Glasses */}
          <g fill="none" stroke="#1E40AF" strokeWidth="3.5" strokeLinejoin="round">
            <circle cx="102" cy="81" r="15" fill="rgba(255,255,255,0.4)" />
            <circle cx="138" cy="81" r="15" fill="rgba(255,255,255,0.4)" />
            <path d="M117 81 L123 81" />
            <path d="M87 81 L74 76" />
            <path d="M153 81 L166 76" />
          </g>

          {/* Large Open Storybook */}
          <g transform="translate(120 152)">
            {/* Book Spine Hardcover */}
            <path
              d="M-56 6 Q-44 -8 0 -10 Q44 -8 56 6 Q44 26 0 28 Q-44 26 -56 6 Z"
              fill="#1E40AF"
              stroke="#203354"
              strokeWidth="3"
            />
            {/* Pages with Flutter effect */}
            <g className={styles.magicPageTurn}>
              <path
                d="M-52 4 Q-40 -6 0 -8 Q40 -6 52 4 Q40 22 0 24 Q-40 22 -52 4 Z"
                fill="#FFFDF8"
                stroke="#203354"
                strokeWidth="2"
              />
              {/* Ruled lines & mini illustration */}
              <line x1="-42" y1="1" x2="-10" y2="1" stroke="#93C5FD" strokeWidth="1.8" />
              <line x1="-42" y1="7" x2="-10" y2="7" stroke="#93C5FD" strokeWidth="1.8" />
              <line x1="-42" y1="13" x2="-10" y2="13" stroke="#93C5FD" strokeWidth="1.8" />
              <circle cx="28" cy="7" r="8" fill="#FDE68A" />
              <line x1="10" y1="1" x2="18" y2="1" stroke="#93C5FD" strokeWidth="1.8" />
              <line x1="10" y1="7" x2="18" y2="7" stroke="#93C5FD" strokeWidth="1.8" />
            </g>
          </g>

          {/* Holding Paws */}
          <ellipse cx="74" cy="154" rx="9" ry="7" fill="#FFFDF8" stroke="#203354" strokeWidth="2.5" />
          <ellipse cx="166" cy="154" rx="9" ry="7" fill="#FFFDF8" stroke="#203354" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
}
