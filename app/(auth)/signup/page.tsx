"use client"

import { useState } from "react"
import { Input } from "@/components/UI/input"
import { Button } from "@/components/UI/button"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/UI/card"
import { Label } from "@/components/UI/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/UI/themeToggle"
import { register } from "@/lib/api"  // 🔑 fungsi register dari API

export default function SignupPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSignup = async () => {
    try {
      await register(username, password)
      alert("Register berhasil ✅, silakan login")
      router.push("/signin")
    } catch {
      alert("Register gagal ❌")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-base">
      <div className="w-full max-w-md bg-card p-6 rounded-xl shadow-lg border border-base">
        <ThemeToggle /> {/* tombol toggle ada di pojok */}
        <Card className="w-full p-6 shadow-xl border-gray-800 bg-gray-900">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-white">
              Sign Up
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Username */}
            <div>
              <Label htmlFor="username" className="text-gray-300">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            {/* Button */}
            <Button
              className="w-full bg-primary hover:bg-primary/80 text-white"
              onClick={handleSignup}
            >
              Sign Up
            </Button>

            {/* Signin link */}
            <p className="text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link href="/signin" className="text-emerald-500 hover:underline">
                Sign In
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
