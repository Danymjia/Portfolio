import SmoothScroll from '../components/SmoothScroll';
import "./globals.css";

export const metadata = {
  title: "Portfolio - Josue Mejia",
  description: "Portfolio de Josue Mejia",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
