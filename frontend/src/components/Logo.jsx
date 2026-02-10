export default function Logo({ className = "w-10 h-10" }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      fill="none"
    >
      {/* Background circle with gradient */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#14b8a6', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      
      {/* Main circle background */}
      <circle cx="50" cy="50" r="45" fill="url(#logoGradient)" />
      
      {/* Code brackets */}
      <g stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Left bracket */}
        <path d="M30 35 L22 50 L30 65" />
        {/* Right bracket */}
        <path d="M70 35 L78 50 L70 65" />
      </g>
      
      {/* AI Brain/Circuit lines */}
      <g stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" fill="none">
        {/* Brain circuit connections */}
        <path d="M42 45 L50 40 L58 45" />
        <path d="M42 55 L50 60 L58 55" />
        <circle cx="50" cy="50" r="3" fill="white" stroke="none" />
        {/* Connection dots */}
        <circle cx="42" cy="45" r="2" fill="white" stroke="none" />
        <circle cx="58" cy="45" r="2" fill="white" stroke="none" />
        <circle cx="42" cy="55" r="2" fill="white" stroke="none" />
        <circle cx="58" cy="55" r="2" fill="white" stroke="none" />
      </g>
      
      {/* Sparkle effect */}
      <g fill="white">
        <polygon 
          points="50,28 51.5,32 56,32.5 52.5,35.5 54,40 50,37 46,40 47.5,35.5 44,32.5 48.5,32" 
          opacity="0.8"
        />
      </g>
    </svg>
  );
}

