export function Feather({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 120" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="feather-fill" x1="0" x2="1">
          <stop offset="0" stopColor="#0b0812" />
          <stop offset="0.5" stopColor="#2a1c40" />
          <stop offset="1" stopColor="#0b0812" />
        </linearGradient>
      </defs>
      <path
        d="M20 2 C34 22 38 52 30 84 C26 98 22 108 20 118 C18 108 14 98 10 84 C2 52 6 22 20 2 Z"
        fill="url(#feather-fill)"
        stroke="#6426b8"
        strokeOpacity="0.45"
        strokeWidth="0.8"
      />
      <path d="M20 6 L20 118" stroke="#c8c4d2" strokeOpacity="0.5" strokeWidth="0.8" />
    </svg>
  )
}
