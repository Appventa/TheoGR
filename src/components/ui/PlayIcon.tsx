interface PlayIconProps {
  size?: number;
  className?: string;
}

export function PlayIcon({ size = 48, className = '' }: PlayIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="24" cy="24" r="23" stroke="#ffc965" strokeWidth="1.5" />
      <path d="M19 15.5L34 24L19 32.5V15.5Z" fill="#ffc965" />
    </svg>
  );
}
