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
        {/* Soft 2D Study Backdrop Glow */}
        <circle cx="120" cy="115" r="92" fill="#F3F0FF" />
        <circle cx="120" cy="115" r="74" fill="#FFFFFF" />

        {/* Floating 2D Study Sparks */}
        <g transform="translate(120 20)" className={styles.ideaLightbulbGlow}>
          <circle cx="0" cy="0" r="14" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
          <polygon points="-4,9 4,9 2,15 -2,15" fill="#94A3B8" />
          <line x1="0" y1="-18" x2="0" y2="-23" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="-14" y1="-12" x2="-18" y2="-16" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="14" y1="-12" x2="18" y2="-16" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
          <text x="0" y="5" fill="#78350F" fontSize="11" fontWeight="bold" textAnchor="middle">💡</text>
        </g>

        <g className={styles.codeParticle1}>
          <rect x="24" y="60" width="30" height="22" rx="6" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1.5" />
          <text x="39" y="75" fill="#15803D" fontSize="11" fontWeight="bold" textAnchor="middle">A+</text>
        </g>

        <g className={styles.codeParticle2}>
          <rect x="186" y="68" width="30" height="22" rx="6" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.5" />
          <text x="201" y="83" fill="#6D28D9" fontSize="12" fontWeight="bold" textAnchor="middle">★</text>
        </g>

        {/* 2D Study Desk Base */}
        <path d="M20 185 L220 185 L230 205 L10 205 Z" fill="#854D0E" stroke="#583101" strokeWidth="2.5" />
        <rect x="10" y="205" width="220" height="6" fill="#583101" />

        {/* 2D Character Body */}
        <g className={styles.heroFloatingGroup}>
          {/* Fluffy Animated Fox Tail */}
          <g className={styles.tailWag}>
            <path
              d="M44 135 C20 105, 8 145, 26 172 C44 192, 74 182, 68 152 Z"
              fill="#E05638"
              stroke="#203354"
              strokeWidth="3"
            />
            <path d="M26 172 C34 182, 50 185, 56 179 C46 167, 40 162, 34 157 Z" fill="#FFFFFF" stroke="#203354" strokeWidth="2" />
          </g>

          {/* Fox Body */}
          <ellipse cx="120" cy="148" rx="44" ry="38" fill="#E05638" stroke="#203354" strokeWidth="3" />
          <ellipse cx="120" cy="152" rx="26" ry="24" fill="#FFFDF8" />

          {/* 2D Fox Head */}
          <g transform="translate(120 86)">
            {/* Left Ear */}
            <path d="M-36 -32 L-52 -82 L-12 -56 Z" fill="#E05638" stroke="#203354" strokeWidth="3" strokeLinejoin="round" />
            <path d="M-38 -45 L-46 -72 L-24 -56 Z" fill="#FBBF24" />

            {/* Right Ear */}
            <path d="M36 -32 L52 -82 L12 -56 Z" fill="#E05638" stroke="#203354" strokeWidth="3" strokeLinejoin="round" />
            <path d="M38 -45 L46 -72 L24 -56 Z" fill="#FBBF24" />

            {/* Face base */}
            <path
              d="M-44 -32 C-54 -2, -34 26, 0 34 C34 26, 54 -2, 44 -32 C30 -42, -30 -42, -44 -32 Z"
              fill="#E05638"
              stroke="#203354"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path
              d="M-40 -18 C-44 14, -24 30, 0 34 C24 30, 44 14, 40 -18 C28 -4, -28 -4, -40 -18 Z"
              fill="#FFFDF8"
              stroke="#203354"
              strokeWidth="2"
            />

            {/* Cheeks */}
            <ellipse cx="-24" cy="8" rx="8" ry="5" fill="#F59E0B" opacity="0.6" />
            <ellipse cx="24" cy="8" rx="8" ry="5" fill="#F59E0B" opacity="0.6" />

            {/* Inquisitive Studious Eyes */}
            <g className={styles.eyeBlink}>
              <ellipse cx="-16" cy="-4" rx="4.5" ry="6.5" fill="#203354" />
              <circle cx="-14.5" cy="-6" r="2" fill="#FFFFFF" />
              <ellipse cx="16" cy="-4" rx="4.5" ry="6.5" fill="#203354" />
              <circle cx="17.5" cy="-6" r="2" fill="#FFFFFF" />
            </g>

            {/* Nose & Smile */}
            <polygon points="-5,14 5,14 0,19" fill="#203354" />
            <path d="M0 19 L0 23" stroke="#203354" strokeWidth="2" strokeLinecap="round" />
            <path d="M-6 24 Q0 28 6 24" stroke="#203354" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>

          {/* Scholar Glasses */}
          <g fill="none" stroke="#1E40AF" strokeWidth="3.5" strokeLinejoin="round">
            <circle cx="102" cy="82" r="15" fill="rgba(255,255,255,0.4)" />
            <circle cx="138" cy="82" r="15" fill="rgba(255,255,255,0.4)" />
            <path d="M117 82 L123 82" />
            <path d="M87 82 L74 77" />
            <path d="M153 82 L166 77" />
          </g>

          {/* Open Ruled Spiral Study Notebook on Desk */}
          <g transform="translate(108 160)">
            {/* Spiral binding coils */}
            <ellipse cx="-42" cy="-12" rx="3" ry="5" fill="#94A3B8" />
            <ellipse cx="-42" cy="-2" rx="3" ry="5" fill="#94A3B8" />
            <ellipse cx="-42" cy="8" rx="3" ry="5" fill="#94A3B8" />
            <ellipse cx="-42" cy="18" rx="3" ry="5" fill="#94A3B8" />

            {/* Lined Notebook Pages */}
            <rect x="-38" y="-18" width="68" height="44" rx="3" fill="#FFFDF8" stroke="#203354" strokeWidth="2" />
            {/* Coral Margin Line */}
            <line x1="-24" y1="-18" x2="-24" y2="26" stroke="#DF6E61" strokeWidth="1.5" />
            {/* Faint Ruled Lines */}
            <line x1="-20" y1="-10" x2="24" y2="-10" stroke="#93C5FD" strokeWidth="1.5" />
            <line x1="-20" y1="-2" x2="24" y2="-2" stroke="#93C5FD" strokeWidth="1.5" />
            <line x1="-20" y1="6" x2="20" y2="6" stroke="#93C5FD" strokeWidth="1.5" />
            <line x1="-20" y1="14" x2="16" y2="14" stroke="#93C5FD" strokeWidth="1.5" />
            <line x1="-20" y1="22" x2="24" y2="22" stroke="#93C5FD" strokeWidth="1.5" />
          </g>

          {/* Left Paw holding notebook steady */}
          <ellipse cx="68" cy="162" rx="9" ry="7" fill="#FFFDF8" stroke="#203354" strokeWidth="2.5" />

          {/* Right Paw holding moving yellow pencil */}
          <g className={styles.pencilPencilWrite} transform="translate(142 150)">
            {/* Yellow Pencil */}
            <polygon points="0,0 10,-24 16,-22 6,2" fill="#FBBF24" stroke="#203354" strokeWidth="1.8" />
            {/* Pink Eraser */}
            <polygon points="10,-24 16,-22 18,-27 12,-29" fill="#F472B6" stroke="#203354" strokeWidth="1.5" />
            {/* Lead Tip */}
            <polygon points="0,0 6,2 3,6" fill="#1E293B" />
            {/* Right Paw Wrapping Pencil */}
            <ellipse cx="8" cy="-6" rx="9" ry="7" fill="#FFFDF8" stroke="#203354" strokeWidth="2.5" />
          </g>
        </g>
      </svg>
    </div>
  );
}
