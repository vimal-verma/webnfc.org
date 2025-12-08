import "./globals.css";
import Header from "../app/components/Header";
import Footer from "../app/components/Footer";
import { ThemeProvider } from "./context/ThemeContext";


export const metadata = {
  metadataBase: new URL('https://webnfc.org'),
  title: {
    default: 'WebNfc | The Future of Networking',
    template: '%s | WebNfc',
  },
  description: "Create and customize your own NFC-powered business cards. Make a lasting impression with a single tap. Order online for fast delivery.",
  manifest: '/manifest.json',
  keywords: ['NFC business cards', 'digital business cards', 'custom NFC cards', 'smart business cards', 'NFC technology', 'networking', 'contactless cards', 'NFC card design', 'digital networking', 'NFC card printing', 'Customizable NFC cards', 'Eco-friendly business cards', 'NFC card solutions', 'Professional networking tools', 'Design Your NFC Card', 'NFC Card Features', 'NFC Card Pricing', 'Order NFC Cards Online', 'low cost NFC cards', 'NFC card reviews', 'NFC card blog', 'NFC card contact', 'NFC card FAQ', 'NFC Tool for web', 'NFC card templates', 'NFC card ideas'],
  openGraph: {
    title: 'WebNfc | The Future of Networking',
    description: 'Create and customize your own NFC-powered business cards.',
    url: 'https://webnfc.org',
    siteName: 'WebNfc',
    images: '/og-image.png', // Add a default Open Graph image to your /public folder
    type: 'website',
  },
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Header />
          <main className="main-content">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
