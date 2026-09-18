import { Agentation } from 'agentation';
import { Quicksand } from 'next/font/google';
import SmoothScroll from './components/SmoothScroll';
import 'lenis/dist/lenis.css';
import './globals.css';

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-quicksand',
  display: 'swap',
});

export const metadata = {
  title: 'Singularity 2.0 | National-Level Hackathon at K.C. College, Thane',
  description:
    'An 18-hour offline hackathon sprint on 19–20 December 2026 at K.C. College of Engineering & Management Studies, Thane. Teams of 2–4, ₹40,000 prize pool, four tracks: AI-Enabled Hardware, Health & Emergency Services, FinTech, and Environmental. Register on Unstop by 20 November.',
  openGraph: {
    title: 'Singularity 2.0 | National-Level Hackathon',
    description:
      'An 18-hour offline sprint at K.C. College, Thane. Teams of 2–4. ₹40,000 prize pool. Registrations close 20 November 2026.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={quicksand.variable} suppressHydrationWarning>
      <head>
        {/* Disable browser scroll restoration synchronously before hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
              try {
                Object.keys(sessionStorage).forEach(function(k) {
                  if (k.indexOf('scroll') !== -1 || k.indexOf('next') !== -1) {
                    sessionStorage.removeItem(k);
                  }
                });
              } catch(e) {}
              // opacity:0 hides ALL visual scroll jumps (overflow:hidden only stops
              // user-initiated scroll but doesn't hide programmatic window.scrollTo calls)
              document.documentElement.style.opacity = '0';
              document.documentElement.style.overflow = 'hidden';
              window.scrollTo(0, 0);
            `,
          }}
        />
      </head>
      <body className={`${quicksand.className} font-sans`}>
        <SmoothScroll>{children}</SmoothScroll>
        {process.env.NODE_ENV === 'development' && <Agentation />}
      </body>
    </html>
  );
}
