import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  link?: boolean;
  className?: string;
}

const sizes = {
  sm: {
    width: 120,
    height: 40,
    imageWidth: 100,
  },

  md: {
    width: 160,
    height: 52,
    imageWidth: 145,
  },

  lg: {
    width: 210,
    height: 70,
    imageWidth: 190,
  },
};

export function Logo({
  size = "md",
  showTagline = false,
  link = true,
  className = "",
}: LogoProps) {
  const config = sizes[size];

  const content = (
    <div
      className={`flex items-center ${className}`}
      aria-label="NewsSphere — Truth. First."
    >
      <Image
        src="/logo.png"
        alt="NewsSphere — Truth. First."
        width={config.width}
        height={config.height}
        priority={size !== "sm"}
        className="h-auto w-auto object-contain"
        style={{
          width: `${config.imageWidth}px`,
        }}
      />

      {showTagline && (
        <span className="sr-only">
          NewsSphere — Truth. First.
        </span>
      )}
    </div>
  );

  if (!link) {
    return content;
  }

  return (
    <Link
      href="/"
      aria-label="NewsSphere — Truth. First. Home"
      className="inline-flex items-center"
    >
      {content}
    </Link>
  );
}

// Keep default export compatibility for any other component
// that may already import Logo as a default export.
export default Logo;