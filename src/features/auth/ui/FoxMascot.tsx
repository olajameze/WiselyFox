/**
 * FoxMascot — a reusable architectural line-art blueprint vector of the WiselyFox
 * mascot (a fox wearing glasses and holding an open book). No 3D shading; uses
 * fine-line strokes and the Modern Architects' Studio palette via CSS variables.
 */
export function FoxMascot({
  className,
  title = "WiselyFox mascot",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 180"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      {/* Construction crosshairs / blueprint guide lines */}
      <g
        stroke="var(--notebook-line, rgba(168,192,216,0.4))"
        strokeWidth="0.75"
        fill="none"
        aria-hidden="true"
      >
        <line x1="100" y1="4" x2="100" y2="176" />
        <line x1="6" y1="90" x2="194" y2="90" />
        <line x1="30" y1="30" x2="170" y2="150" />
        <line x1="170" y1="30" x2="30" y2="150" />
      </g>

      {/* ---- Fox head ---- */}
      <g transform="translate(100 74)">
        {/* ears */}
        <path
          d="M-30 -34 L-44 -74 L-10 -52 Z"
          fill="var(--color-accent-soft, #fff1e6)"
          stroke="var(--notebook-trust, #203354)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M30 -34 L44 -74 L10 -52 Z"
          fill="var(--color-accent-soft, #fff1e6)"
          stroke="var(--notebook-trust, #203354)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* inner ears */}
        <path d="M-33 -46 L-38 -63 L-22 -50 Z" fill="var(--color-accent, #F26200)" />
        <path d="M33 -46 L38 -63 L22 -50 Z" fill="var(--color-accent, #F26200)" />
        {/* face / head */}
        <path
          d="M-38 -34 Q-46 -6 -28 10 Q0 26 28 10 Q46 -6 38 -34 Z"
          fill="var(--color-surface, #fffdf8)"
          stroke="var(--notebook-trust, #203354)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* cheeks */}
        <ellipse cx="-20" cy="4" rx="9" ry="5" fill="var(--color-accent, #F26200)" opacity="0.55" />
        <ellipse cx="20" cy="4" rx="9" ry="5" fill="var(--color-accent, #F26200)" opacity="0.55" />
        {/* muzzle */}
        <ellipse cx="0" cy="12" rx="13" ry="9" fill="var(--color-surface, #fffdf8)" stroke="var(--notebook-trust, #203354)" strokeWidth="1.5" />
        <path d="M0 6 L0 16" stroke="var(--notebook-trust, #203354)" strokeWidth="1.5" />
        <circle cx="-4" cy="11" r="1.6" fill="var(--accent-blue-trust, #1E40AF)" />
        <circle cx="4" cy="11" r="1.6" fill="var(--accent-blue-trust, #1E40AF)" />
      </g>

      {/* ---- Glasses ---- */}
      <g
        fill="none"
        stroke="var(--notebook-trust, #203354)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      >
        <circle cx="70" cy="82" r="13" />
        <circle cx="130" cy="82" r="13" />
        <path d="M83 82 L117 82" />
        <path d="M57 82 L40 78" />
        <path d="M143 82 L160 78" />
      </g>

      {/* ---- Open book (held by the fox) ---- */}
      <g transform="translate(100 128)">
        <path
          d="M-40 0 Q-34 -10 0 -12 Q34 -10 40 0 Q34 14 0 16 Q-34 14 -40 0 Z"
          fill="var(--color-surface, #fffdf8)"
          stroke="var(--notebook-trust, #203354)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <line x1="0" y1="-12" x2="0" y2="16" stroke="var(--notebook-trust, #203354)" strokeWidth="2" />
        {/* ruled page lines */}
        <line x1="-32" y1="-4" x2="-6" y2="-4" stroke="var(--notebook-line, rgba(168,192,216,0.8))" strokeWidth="1.2" />
        <line x1="-32" y1="2" x2="-6" y2="2" stroke="var(--notebook-line, rgba(168,192,216,0.8))" strokeWidth="1.2" />
        <line x1="-32" y1="8" x2="-6" y2="8" stroke="var(--notebook-line, rgba(168,192,216,0.8))" strokeWidth="1.2" />
        <line x1="6" y1="-4" x2="32" y2="-4" stroke="var(--notebook-line, rgba(168,192,216,0.8))" strokeWidth="1.2" />
        {/* corner accent */}
        <path d="M32 -4 L26 0" stroke="var(--color-accent, #F26200)" strokeWidth="2" />
      </g>

      {/* ---- Dimensional callout ticks (blueprint style) ---- */}
      <g stroke="var(--notebook-margin, #df6e61)" strokeWidth="1" fill="none" aria-hidden="true">
        <line x1="14" y1="40" x2="14" y2="128" />
        <line x1="10" y1="40" x2="18" y2="40" />
        <line x1="10" y1="128" x2="18" y2="128" />
        <line x1="186" y1="40" x2="186" y2="128" />
        <line x1="182" y1="40" x2="190" y2="40" />
        <line x1="182" y1="128" x2="190" y2="128" />
      </g>
    </svg>
  );
}
