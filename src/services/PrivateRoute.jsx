"use client"

import { useEffect } from "react"
import { useAuth } from "../hooks/use-auth"
import { useNavigate } from "react-router-dom"

export function PrivateRoute({ children }) {
  const { session, loading } = useAuth()
  const router = useNavigate()

  useEffect(() => {
    if (!loading && !session) {
      router.push("/login")
    }
  }, [session, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return <>{children}</>
}
