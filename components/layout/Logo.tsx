import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export default function Logo({
  className = "",
  width = 180,
  height = 60,
  priority = false,
}: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="NewsSphere — Truth. First."
      className={`inline-flex items-center ${className}`}
    >
      <Image
        src="/logo.png"
        alt="NewsSphere — Truth. First."
        width={width}
        height={height}
        priority={priority}
        className="h-auto w-auto object-contain"
      />
    </Link>
  );
}