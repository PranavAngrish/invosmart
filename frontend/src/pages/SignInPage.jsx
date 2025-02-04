"use client"

// import Link from "next/link"
import React from "react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Checkbox } from "../components/ui/checkbox"
import backgroundImage from "../assets/backgroungImage.png"

export default function SignInPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <div className="flex min-h-screen bg-[#fafafa]">
      {/* Left Column */}
      <div className="flex w-full lg:w-1/2 flex-col px-4 sm:px-6 lg:px-8 justify-center bg-white">
        <div className="mx-auto w-full max-w-sm">
          <h1 className="text-2xl font-semibold mb-8">Get Started Now</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
           

            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="h-11 bg-white"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-sm">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="h-11 bg-white"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.terms}
                onCheckedChange={(checked) => setFormData({ ...formData, terms: checked })}
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <Link href="/terms" className="text-gray-900 hover:underline">
                  terms & policy
                </Link>
              </label>
            </div>

            <Button className="w-full h-11 bg-[#3b5c29] hover:bg-[#2e4820] text-white" type="submit">
              Sign In
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or</span>
              </div>
            </div>

            <div className="grid gap-3">
              <button
                type="button"
                className="flex items-center justify-center w-full h-11 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Sign in with Google
              </button>

              
            </div>

            <p className="text-center text-sm text-gray-600">
              Doesn't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Column */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt="Monstera leaves"
            fill
            className="object-cover"
            priority
            sizes="50vw"
          />
        </div>
      </div>
    </div>
  )
}

