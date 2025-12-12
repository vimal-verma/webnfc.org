import "./globals.css";
import Header from "../app/components/Header";
import Footer from "../app/components/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import ServiceWorkerRegistrar from "./components/ServiceWorkerRegistrar";


export const metadata = {
  metadataBase: new URL('https://webnfc.org'),
  title: {
    default: 'WebNfc | NFC Tools & Guide',
    template: '%s | WebNfc',
  },
  description: "Leading Web NFC tools and resources to read, write, and manage NFC tags directly from your browser.",
  manifest: '/manifest.json',
  keywords: ['NFC tools', 'Web NFC guide', 'NFC tag reader', 'NFC tag writer', 'vCard generator', 'NFC business cards', 'Contactless technology', 'NFC tutorials', 'WebNFC API', 'NFC applications', 'Digital business cards', 'Custom NFC cards', 'Smart business cards', 'NFC technology', 'Networking', 'Contactless cards', 'NFC card design', 'Digital networking', 'NFC card printing', 'Customizable NFC cards', 'Eco-friendly business cards', 'NFC card solutions', 'Professional networking tools', 'Design your NFC card', 'NFC card features', 'NFC card pricing', 'Order NFC cards online', 'Low cost NFC cards', 'NFC card reviews', 'NFC card blog', 'NFC card contact', 'NFC card FAQ'],
  openGraph: {
    title: 'WebNfc | NFC Tools & Guide',
    description: 'Leading Web NFC tools and resources to read, write, and manage NFC tags directly from your browser.',
    url: 'https://webnfc.org',
    siteName: 'WebNfc',
    images: '/logo.jpg',
    type: 'website',
  },
  icons: {
    icon: '/globe-white.jpg',
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
          <ServiceWorkerRegistrar />
        </ThemeProvider>
      </body>
    </html>
  );
}
