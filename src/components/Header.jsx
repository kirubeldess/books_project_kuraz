import { useState } from "react"
import { BookOpen, Heart, User, LogOut, Menu, X } from "lucide-react"
import { Button } from "../components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { useAuth } from "../hooks/use-auth"
import { Link, useNavigate } from "react-router-dom"

export default function Header() {
    const { user, signOut } = useAuth()
    const router = useNavigate()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const handleSignOut = async () => {
        await signOut()
        router("/")
    }

    return (
        <header className="sticky top-0 z-50 bg-green-900 text-white border-b border-green-800">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded ">
                            <BookOpen className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">BookVerse</span>
                    </Link>

                    <nav className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-white hover:text-gray-300 transition-colors">
                            Home
                        </Link>
                        <Link to="/categories" className="text-white hover:text-gray-300 transition-colors">
                            Categories
                        </Link>
                        {user && (
                            <Link
                                to="/favorites"
                                className="flex items-center space-x-1 text-white hover:text-gray-300 transition-colors"
                            >
                                <span>Favorites</span>
                            </Link>
                        )}
                    </nav>

                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="flex items-center space-x-2 text-white hover:bg-green-800">
                                        <User className="h-4 w-4" />
                                        <span>{user.email}</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuItem asChild>
                                        <Link to="/favorites" className="flex items-center">
                                            <Heart className="mr-2 h-4 w-4" />
                                            My Favorites
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Sign Out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Button asChild variant="ghost" className="text-white hover:bg-green-800">
                                    <Link to="/signin">Sign In</Link>
                                </Button>
                                <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
                                    <Link to="/signup">Get Started</Link>
                                </Button>
                            </div>
                        )}
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden text-white hover:bg-green-800"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>

                {mobileMenuOpen && (
                    <div className="border-t border-green-800 bg-green-900 md:hidden">
                        <div className="space-y-1 px-4 py-4">
                            <Link
                                to="/"
                                className="block rounded-md px-3 py-2 text-white hover:bg-green-800 hover:text-white"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                to="/categories"
                                className="block rounded-md px-3 py-2 text-white hover:bg-green-800 hover:text-white"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Categories
                            </Link>
                            {user && (
                                <Link
                                    to="/favorites"
                                    className="flex items-center space-x-2 rounded-md px-3 py-2 text-white hover:bg-green-800 hover:text-white"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <Heart className="h-4 w-4" />
                                    <span>Favorites</span>
                                </Link>
                            )}
                            <div className="border-t border-green-800 pt-4">
                                {user ? (
                                    <div className="space-y-1">
                                        <div className="px-3 py-2 text-sm text-gray-400">{user.email}</div>
                                        <button
                                            onClick={handleSignOut}
                                            className="flex w-full items-center space-x-2 rounded-md px-3 py-2 text-red-400 hover:bg-green-800"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            <span>Sign Out</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <Button asChild variant="ghost" className="w-full justify-start text-white hover:bg-green-800">
                                            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                                                Sign In
                                            </Link>
                                        </Button>
                                        <Button asChild className="w-full bg-orange-500 hover:bg-orange-600">
                                            <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                                                Get Started
                                            </Link>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}
