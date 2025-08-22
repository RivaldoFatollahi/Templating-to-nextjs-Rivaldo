import "./globals.css"

export const metadata = {
  title: "My App",
  description: "Demo Switcher Layout",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
