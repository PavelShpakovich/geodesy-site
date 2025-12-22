import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/HeaderServer';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { SITE } from '@/lib/constants/text';
import { SEO_CONFIG } from '@/lib/seo/metadata';
import { YandexMetrika } from '@/components/analytics/YandexMetrika';

// Yandex Metrika counter ID - получи на https://metrika.yandex.ru
const YANDEX_METRIKA_ID = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID || '';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SEO_CONFIG.SITE_URL),
  title: {
    default: SEO_CONFIG.DEFAULT_TITLE,
    template: `%s | ${SEO_CONFIG.SITE_NAME}`,
  },
  description: SEO_CONFIG.DEFAULT_DESCRIPTION,
  authors: [{ name: SEO_CONFIG.SITE_NAME }],
  creator: SEO_CONFIG.SITE_NAME,
  publisher: SEO_CONFIG.SITE_NAME,
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: 'website',
    locale: SEO_CONFIG.LOCALE,
    url: SEO_CONFIG.SITE_URL,
    title: SEO_CONFIG.DEFAULT_TITLE,
    description: SEO_CONFIG.DEFAULT_DESCRIPTION,
    siteName: SEO_CONFIG.SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO_CONFIG.DEFAULT_TITLE,
    description: SEO_CONFIG.DEFAULT_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={SITE.LANG} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('geodesy-site-theme') || 'system';
                const root = document.documentElement;
                if (theme === 'system') {
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  root.classList.add(systemTheme);
                } else {
                  root.classList.add(theme);
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider defaultTheme='system' storageKey='geodesy-site-theme'>
          <div className='relative flex min-h-screen flex-col'>
            <Header />
            <main className='flex-1'>{children}</main>
            <Footer />
          </div>
          {YANDEX_METRIKA_ID && <YandexMetrika counterId={YANDEX_METRIKA_ID} />}
        </ThemeProvider>
      </body>
    </html>
  );
}
