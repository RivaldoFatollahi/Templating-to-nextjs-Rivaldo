import "./globals.css"

export const metadata = {
  title: "Templating",
  description: "Demo Switcher Layout",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
