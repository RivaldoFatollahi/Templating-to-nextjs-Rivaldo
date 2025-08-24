"use client"

import { useState } from "react"
import { Input } from "@/components/UI/input"
import { Button } from "@/components/UI/button"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/UI/card"
import { Label } from "@/components/UI/label"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/UI/themeToggle"

export default function SigninPage() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  return (
    <div className="flex min-h-screen items-center justify-center bg-base">
      <div className="w-full max-w-md bg-card p-6 rounded-xl shadow-lg border border-base">
        <ThemeToggle /> {/* tombol toggle ada di pojok */}
    <Card className="w-full p-6 shadow-xl border-gray-800 bg-gray-900">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-white">
          Sign In
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-300">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>

        {/* Password */}
        <div className="space-y-2 relative">
          <Label htmlFor="password" className="text-gray-300">Password</Label>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="********"
            className="bg-gray-800 border-gray-700 text-white pr-10"
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-gray-400 hover:text-white"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Button */}
        <Button
          className="w-full bg-primary hover:bg-primary/80 text-white"
          onClick={() => router.push("/dashboard")}
        >
          Sign In
        </Button>

        {/* Signup link */}
        <p className="text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-emerald-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </CardContent>
    </Card>
     </div>
    </div>
  )
}
