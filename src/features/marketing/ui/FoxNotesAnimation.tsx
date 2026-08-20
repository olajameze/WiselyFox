"use client";

import styles from "../styles/mascot-animations.module.css";

export function FoxNotesAnimation({ className }: { className?: string }) {
  return (
    <div className={`${styles.mascotWrapper} ${className ?? ""}`} aria-hidden="true">
      <svg
        className={styles.mascotSvg}
        viewBox="0 0 240 220"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Study Zone Aura */}
        <circle cx="120" cy="110" r="90" fill="rgba(237, 233, 254, 0.65)" />
        <circle cx="120" cy="110" r="70" fill="rgba(255, 255, 255, 0.85)" />

        {/* Glowing Idea Lightbulb Above Head */}
        <g transform="translate(120 18)" className={styles.ideaLightbulbGlow}>
          <circle cx="0" cy="0" r="14" fill="#FBBF24" />
          <polygon points="-4,10 4,10 2,16 -2,16" fill="#94A3B8" />
          <line x1="0" y1="-18" x2="0" y2="-22" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          <line x1="-15" y1="-12" x2="-19" y2="-15" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          <line x1="15" y1="-12" x2="19" y2="-15" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          <text x="0" y="4" fill="#78350F" fontSize="11" fontWeight="bold" textAnchor="middle">💡</text>
        </g>

        {/* Floating Checkmark Chips */}
        <g className={styles.codeParticle1}>
          <circle cx="34" cy="70" r="12" fill="#DCFCE7" />
          <text x="34" y="74" fill="#16A34A" fontSize="12" fontWeight="bold" textAnchor="middle">✓</text>
        </g>
        <g className={styles.codeParticle2}>
          <circle cx="204" cy="80" r="12" fill="#EDE9FE" />
          <text x="204" y="85" fill="#7C3AED" fontSize="12" fontWeight="bold" textAnchor="middle">★</text>
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

            {/* Inquisitive Eyes */}
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

          {/* Notepad / Clipboard */}
          <g transform="translate(110 156)">
            {/* Clipboard backing */}
            <rect x="-34" y="-12" width="56" height="38" rx="4" fill="#78350F" stroke="#203354" strokeWidth="2" />
            {/* Paper */}
            <rect x="-30" y="-8" width="48" height="32" rx="2" fill="#FFFDF8" />
            {/* Clip */}
            <rect x="-14" y="-14" width="16" height="5" rx="2" fill="#94A3B8" />
            {/* Notes content */}
            <line x1="-24" y1="-2" x2="12" y2="-2" stroke="#60A5FA" strokeWidth="1.8" />
            <line x1="-24" y1="4" x2="4" y2="4" stroke="#60A5FA" strokeWidth="1.8" />
            <line x1="-24" y1="10" x2="8" y2="10" stroke="#60A5FA" strokeWidth="1.8" />
            <line x1="-24" y1="16" x2="-2" y2="16" stroke="#60A5FA" strokeWidth="1.8" />
          </g>

          {/* Animated Pencil in Paw */}
          <g className={styles.pencilPencilWrite} transform="translate(142 148)">
            {/* Pencil Body */}
            <polygon points="0,0 8,-22 14,-20 6,2" fill="#FBBF24" stroke="#203354" strokeWidth="1.5" />
            {/* Eraser */}
            <polygon points="8,-22 14,-20 16,-25 10,-27" fill="#F472B6" />
            {/* Pencil Tip Lead */}
            <polygon points="0,0 6,2 3,6" fill="#1E293B" />
          </g>

          {/* Left paw holding clipboard */}
          <ellipse cx="76" cy="154" rx="8" ry="6" fill="#FFFDF8" stroke="#203354" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}
