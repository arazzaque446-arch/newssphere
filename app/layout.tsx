import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://newssphere-beta.vercel.app"),

  title: {
    default: "NewsSphere — Truth. First.",
    template: "%s | NewsSphere",
  },

  description:
    "Breaking news, in-depth analysis, and trusted journalism from India and around the world.",

  applicationName: "NewsSphere",

  keywords: [
    "NewsSphere",
    "news",
    "breaking news",
    "India news",
    "world news",
    "technology news",
    "business news",
    "sports news",
    "health news",
    "politics news",
  ],

  authors: [
    {
      name: "NewsSphere",
    },
  ],

  creator: "NewsSphere",
  publisher: "NewsSphere",

  verification: {
    google: "AO13UfgsgUwrPtpIvdH1Csm-GkrmLJ0UEb2N7W5SgRI",
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },

  manifest: "/site.webmanifest",

  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "NewsSphere",
    title: "NewsSphere — Truth. First.",
    description:
      "Breaking news, in-depth analysis, and trusted journalism from India and around the world.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NewsSphere — Truth. First.",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "NewsSphere — Truth. First.",
    description:
      "Breaking news, in-depth analysis, and trusted journalism.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable}`}
    >
      <head>
        {/* Google AdSense Verification Script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1341900232780067"
          crossOrigin="anonymous"
        ></script>

        {/* Google Analytics Scripts */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-F832LF5J53"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F832LF5J53');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}