"use client";

import styles from "../styles/mascot-animations.module.css";

export function FoxHeroAnimation({ className }: { className?: string }) {
  return (
    <div className={`${styles.mascotWrapper} ${className ?? ""}`} aria-hidden="true">
      <svg
        className={styles.mascotSvg}
        viewBox="0 0 240 220"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Decorative ambient background aura */}
        <circle cx="120" cy="110" r="85" fill="rgba(255, 241, 230, 0.55)" />
        <circle cx="120" cy="110" r="68" fill="rgba(255, 253, 248, 0.75)" />

        {/* Floating sparkles */}
        <g className={styles.sparkleStar1}>
          <path
            d="M30 40 L34 48 L42 52 L34 56 L30 64 L26 56 L18 52 L26 48 Z"
            fill="#F59E0B"
          />
        </g>
        <g className={styles.sparkleStar2}>
          <path
            d="M205 50 L208 56 L214 59 L208 62 L205 68 L202 62 L196 59 L202 56 Z"
            fill="#2563EB"
          />
        </g>

        {/* Main Floating Fox Character Group */}
        <g className={styles.heroFloatingGroup}>
          {/* Fluffy tail */}
          <g className={styles.tailWag}>
            <path
              d="M45 135 C20 110, 10 150, 28 175 C45 195, 75 185, 70 155 Z"
              fill="#E05638"
              stroke="#203354"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            {/* White tail tip */}
            <path
              d="M28 175 C36 185, 52 188, 58 182 C48 170, 42 165, 36 160 Z"
              fill="#FFFFFF"
            />
          </g>

          {/* Fox Body */}
          <ellipse
            cx="120"
            cy="150"
            rx="46"
            ry="40"
            fill="#E05638"
            stroke="#203354"
            strokeWidth="3"
          />
          {/* White Chest Belly */}
          <ellipse cx="120" cy="156" rx="28" ry="26" fill="#FFFDF8" />

          {/* Fox Head Group */}
          <g transform="translate(120 90)">
            {/* Left Ear */}
            <path
              d="M-36 -32 L-52 -82 L-12 -56 Z"
              fill="#E05638"
              stroke="#203354"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path d="M-38 -45 L-46 -72 L-24 -56 Z" fill="#FBBF24" />

            {/* Right Ear */}
            <path
              d="M36 -32 L52 -82 L12 -56 Z"
              fill="#E05638"
              stroke="#203354"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path d="M38 -45 L46 -72 L24 -56 Z" fill="#FBBF24" />

            {/* Face base */}
            <path
              d="M-44 -32 C-54 -2, -34 26, 0 34 C34 26, 54 -2, 44 -32 C30 -42, -30 -42, -44 -32 Z"
              fill="#E05638"
              stroke="#203354"
              strokeWidth="3"
              strokeLinejoin="round"
            />

            {/* White face cheeks / snout mask */}
            <path
              d="M-40 -18 C-44 14, -24 30, 0 34 C24 30, 44 14, 40 -18 C28 -4, -28 -4, -40 -18 Z"
              fill="#FFFDF8"
              stroke="#203354"
              strokeWidth="2"
            />

            {/* Rosy Cheeks */}
            <ellipse cx="-24" cy="8" rx="8" ry="5" fill="#F59E0B" opacity="0.6" />
            <ellipse cx="24" cy="8" rx="8" ry="5" fill="#F59E0B" opacity="0.6" />

            {/* Cute Eyes with Blink */}
            <g className={styles.eyeBlink}>
              <ellipse cx="-16" cy="-4" rx="4.5" ry="6.5" fill="#203354" />
              <circle cx="-14.5" cy="-6" r="2" fill="#FFFFFF" />
              <ellipse cx="16" cy="-4" rx="4.5" ry="6.5" fill="#203354" />
              <circle cx="17.5" cy="-6" r="2" fill="#FFFFFF" />
            </g>

            {/* Cute Nose Snout */}
            <polygon points="-5,14 5,14 0,19" fill="#203354" />
            <path d="M0 19 L0 23" stroke="#203354" strokeWidth="2" strokeLinecap="round" />
            <path
              d="M-6 24 Q0 28 6 24"
              stroke="#203354"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </g>

          {/* Smart Scholar Glasses */}
          <g
            fill="none"
            stroke="#1E40AF"
            strokeWidth="3.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          >
            <circle cx="102" cy="86" r="15" fill="rgba(255,255,255,0.4)" />
            <circle cx="138" cy="86" r="15" fill="rgba(255,255,255,0.4)" />
            <path d="M117 86 L123 86" />
            <path d="M87 86 L74 81" />
            <path d="M153 86 L166 81" />
            {/* Glass Lens reflection sparkles */}
            <line x1="96" y1="78" x2="100" y2="75" stroke="#FFFFFF" strokeWidth="2.5" />
            <line x1="132" y1="78" x2="136" y2="75" stroke="#FFFFFF" strokeWidth="2.5" />
          </g>

          {/* Open Learning Journal (Held in Paws) */}
          <g transform="translate(120 156)">
            {/* Book Base Cover */}
            <path
              d="M-52 4 Q-42 -8 0 -10 Q42 -8 52 4 Q42 22 0 24 Q-42 22 -52 4 Z"
              fill="#2563EB"
              stroke="#203354"
              strokeWidth="3"
            />
            {/* Book Pages */}
            <path
              d="M-48 2 Q-38 -6 0 -8 Q38 -6 48 2 Q38 18 0 20 Q-38 18 -48 2 Z"
              fill="#FFFDF8"
              stroke="#203354"
              strokeWidth="2"
            />
            {/* Spine Fold */}
            <line x1="0" y1="-8" x2="0" y2="20" stroke="#203354" strokeWidth="2.5" />
            {/* Ruled Notebook Lines */}
            <line x1="-38" y1="-1" x2="-8" y2="-1" stroke="#93C5FD" strokeWidth="1.8" />
            <line x1="-38" y1="5" x2="-8" y2="5" stroke="#93C5FD" strokeWidth="1.8" />
            <line x1="-38" y1="11" x2="-8" y2="11" stroke="#93C5FD" strokeWidth="1.8" />
            <line x1="8" y1="-1" x2="38" y2="-1" stroke="#93C5FD" strokeWidth="1.8" />
            <line x1="8" y1="5" x2="38" y2="5" stroke="#93C5FD" strokeWidth="1.8" />
            <line x1="8" y1="11" x2="38" y2="11" stroke="#93C5FD" strokeWidth="1.8" />
            {/* Coral Ribbon Bookmark */}
            <path d="M0 20 L4 32 L0 29 L-4 32 Z" fill="#DF6E61" />
          </g>

          {/* Little Paws Holding Book */}
          <ellipse cx="80" cy="154" rx="9" ry="7" fill="#FFFDF8" stroke="#203354" strokeWidth="2.5" />
          <ellipse cx="160" cy="154" rx="9" ry="7" fill="#FFFDF8" stroke="#203354" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
}
