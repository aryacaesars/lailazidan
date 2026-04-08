import './globals.css'

export const metadata = {
  title: 'Undangan Pernikahan - Laila & Zidan',
  description: 'Undangan pernikahan Laila & Zidan',
  generator: 'devixsolutions',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="overflow-x-hidden">
        <div className="mobile-shell">{children}</div>
      </body>
    </html>
  )
}
