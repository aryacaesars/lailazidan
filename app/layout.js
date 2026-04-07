import './globals.css'

export const metadata = {
  title: 'Undangan Pernikahan - Sarah & David',
  description: 'Undangan pernikahan Sarah Amelia & David Rahman',
  generator: 'v0.dev',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
