import { useState } from "react"
import { BookOpen, Eye, EyeOff } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Alert, AlertDescription } from "../components/ui/alert"
import { useAuth } from "../hooks/use-auth"
import { Link, useNavigate } from "react-router-dom"

export default function RegisterPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const { signUpNewUser } = useAuth()
    const router = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        if (password !== confirmPassword) {
            setError("Passwords do not match")
            setLoading(false)
            return
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters")
            setLoading(false)
            return
        }

        try {
            const result = await signUpNewUser(email, password)
            if (result.success) {
                router("/")
            } else {
                setError(result.error?.message || "Failed to create account")
            }
        } catch (err) {
            setError(err.message || "Failed to create account")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-green-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">

                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold text-gray-900">

                            <Link to="/" className="inline-flex items-center space-x-2">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-green-600 to-green-600">
                                    <BookOpen className="h-7 w-7 text-white" />
                                </div>
                                <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-600 bg-clip-text text-transparent">
                                    BookVerse
                                </span>
                            </Link>
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                            Create your account to start building your personal library
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <Alert variant="destructive">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="h-11"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Create a password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="h-11 pr-10"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 h-11 w-10"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm your password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        className="h-11 pr-10"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 h-11 w-10"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-11 bg-gradient-to-r from-green-600 to-green-600 hover:from-green-700 hover:to-green-700"
                                disabled={loading}
                            >
                                {loading ? "Creating Account..." : "Create Account"}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{" "}
                                <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <div className="mt-3 text-center">
                    <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
                        ← Back to BookVerse
                    </Link>
                </div>
            </div>
        </div>
    )
}
