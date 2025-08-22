import "../globals.css"

export const metadata = {
  title: "Auth",
  description: "Authentication pages",
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen w-full flex items-center justify-center bg-[#0f172a]">
        {/* Auth container */}
        <div className="w-full max-w-md px-4">
          {children}
        </div>
      </body>
    </html>
  )
}
