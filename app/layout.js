import './globals.css'

export const metadata = {
  title: 'Undangan Pernikahan - Sarah & David',
  description: 'Undangan pernikahan Sarah Amelia & David Rahman',
  generator: 'v0.dev',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className="overflow-x-hidden">{children}</body>
    </html>
  )
}
