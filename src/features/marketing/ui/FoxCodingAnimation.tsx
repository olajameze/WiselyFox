"use client";

import styles from "../styles/mascot-animations.module.css";

export function FoxCodingAnimation({ className }: { className?: string }) {
  return (
    <div className={`${styles.mascotWrapper} ${className ?? ""}`} aria-hidden="true">
      <svg
        className={styles.mascotSvg}
        viewBox="0 0 240 220"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ambient Coding Studio Aura */}
        <circle cx="120" cy="110" r="90" fill="rgba(232, 240, 254, 0.65)" />
        <circle cx="120" cy="110" r="70" fill="rgba(255, 255, 255, 0.85)" />

        {/* Floating Neon Code Particles */}
        <g className={styles.codeParticle1}>
          <rect x="25" y="60" width="36" height="20" rx="6" fill="#1E40AF" />
          <text x="43" y="74" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">&lt;/&gt;</text>
        </g>
        <g className={styles.codeParticle2}>
          <rect x="180" y="45" width="34" height="20" rx="6" fill="#0D9488" />
          <text x="197" y="59" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">&#123; &#125;</text>
        </g>
        <g className={styles.codeParticle3}>
          <rect x="185" y="110" width="32" height="18" rx="5" fill="#F59E0B" />
          <text x="201" y="123" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">0101</text>
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

            {/* Focused Coding Eyes */}
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

          {/* Laptop & Coding Glow */}
          <g transform="translate(120 156)">
            {/* Screen Glow */}
            <ellipse cx="0" cy="-6" rx="44" ry="24" fill="#93C5FD" opacity="0.45" className={styles.laptopScreenGlow} />

            {/* Laptop Base */}
            <polygon points="-46,16 46,16 52,22 -52,22" fill="#1E293B" stroke="#203354" strokeWidth="2" />
            {/* Trackpad */}
            <rect x="-10" y="17" width="20" height="4" rx="1" fill="#475569" />

            {/* Laptop Screen Display */}
            <polygon points="-38,-24 38,-24 44,14 -44,14" fill="#0F172A" stroke="#203354" strokeWidth="2.5" />
            {/* Syntax Lines on Screen */}
            <line x1="-30" y1="-14" x2="-8" y2="-14" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="-4" y1="-14" x2="16" y2="-14" stroke="#F472B6" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="-24" y1="-7" x2="8" y2="-7" stroke="#4ADE80" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="-30" y1="0" x2="-12" y2="0" stroke="#FBBF24" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="-6" y1="0" x2="28" y2="0" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="-24" y1="7" x2="4" y2="7" stroke="#A78BFA" strokeWidth="2.2" strokeLinecap="round" />
          </g>

          {/* Typing Paws */}
          <g className={styles.typingHands}>
            <ellipse cx="94" cy="166" rx="8" ry="6" fill="#FFFDF8" stroke="#203354" strokeWidth="2.5" />
            <ellipse cx="146" cy="166" rx="8" ry="6" fill="#FFFDF8" stroke="#203354" strokeWidth="2.5" />
          </g>
        </g>
      </svg>
    </div>
  );
}
