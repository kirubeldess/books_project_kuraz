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
        <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/20 backdrop-blur-md border border-white/10"
                    style={{
                        boxShadow: '0 0 20px rgba(16, 185, 129, 0.4), 0 0 40px rgba(16, 185, 129, 0.2)'
                    }}
                >
                    <BookOpen className="h-6 w-6 text-emerald-800" />
                </div>
                <span className="hidden md:block text-xl font-bold text-emerald-800">BookVerse</span>
            </Link>

            <nav 
                className="flex items-center gap-3 md:gap-6 px-4 md:px-6 py-2 md:py-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10"
                style={{
                    boxShadow: '0 0 30px rgba(16, 185, 129, 0.4), 0 0 60px rgba(16, 185, 129, 0.2)',
                    backdropFilter: 'blur(12px) saturate(180%)',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)'
                }}
            >
                <Link to="/" className="text-xs md:text-sm lg:text-base text-emerald-800 hover:text-emerald-300 transition-colors duration-200 font-medium">
                    Home
                </Link>
                <Link to="/categories" className="text-xs md:text-sm lg:text-base text-emerald-800 hover:text-emerald-300 transition-colors duration-200 font-medium">
                    Categories
                </Link>
                {user && (
                    <Link
                        to="/favorites"
                        className="text-xs md:text-sm lg:text-base text-emerald-800 hover:text-emerald-300 transition-colors duration-200 font-medium"
                    >
                        Favorites
                    </Link>
                )}
            </nav>
            <div className="hidden md:flex items-center gap-4">
                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="flex items-center space-x-2 text-emerald-800 hover:bg-white/10 backdrop-blur-sm transition-all duration-200 rounded-full px-4 py-2"
                                style={{
                                    boxShadow: '0 0 15px rgba(16, 185, 129, 0.3), 0 0 30px rgba(16, 185, 129, 0.1)'
                                }}
                            >
                                <User className="h-4 w-4" />
                                <span className="text-sm text-emerald-800">{user.email}</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 bg-black/95 backdrop-blur-md border border-white/10">
                            <DropdownMenuItem asChild>
                                <Link to="/favorites" className="flex items-center text-white hover:text-emerald-300">
                                    <Heart className="mr-2 h-4 w-4" />
                                    My Favorites
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-white/10" />
                            <DropdownMenuItem onClick={handleSignOut} className="text-red-400 hover:text-red-300">
                                <LogOut className="mr-2 h-4 w-4" />
                                Sign Out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <div className="flex items-center gap-3">
                        <Button asChild variant="ghost" className="text-emerald-800 hover:bg-white/10 backdrop-blur-sm transition-all duration-200 rounded-full px-4 py-2">
                            <Link to="/signin">Sign In</Link>
                        </Button>
                        <Button asChild className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-full px-4 py-2">
                            <Link to="/signup">Get Started</Link>
                        </Button>
                    </div>
                )}
            </div>
            <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-3 rounded-full bg-black/30 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors"
                style={{
                    boxShadow: '0 0 20px rgba(16, 185, 129, 0.4), 0 0 40px rgba(16, 185, 129, 0.2)'
                }}
            >
                {mobileMenuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
            </button>

            {mobileMenuOpen && (
                <div className="fixed top-0 left-0 h-full w-64 bg-black/95 backdrop-blur-md border-r border-white/10 z-40 md:hidden"
                    style={{
                        boxShadow: '0 0 30px rgba(16, 185, 129, 0.4), 0 0 60px rgba(16, 185, 129, 0.2)'
                    }}
                >
                    <div className="flex flex-col p-6 pt-20">
                        
                        {user && (
                            <div className="mb-6 p-4 rounded-lg bg-white/5 border border-white/10">
                                <div className="flex items-center space-x-2 mb-2">
                                    <User className="h-4 w-4 text-emerald-300" />
                                    <span className="text-sm font-medium text-emerald-300">Account</span>
                                </div>
                                <div className="text-sm text-emerald-800 break-all">{user.email}</div>
                            </div>
                        )}
                        <Link
                            to="/"
                            className="text-lg py-4 text-white hover:text-emerald-300 transition-colors border-b border-white/10"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/categories"
                            className="text-lg py-4 text-white hover:text-emerald-300 transition-colors border-b border-white/10"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Categories
                        </Link>
                        {user && (
                            <Link
                                to="/favorites"
                                className="text-lg py-4 text-white hover:text-emerald-300 transition-colors border-b border-white/10"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Favorites
                            </Link>
                        )}
                        <div className="mt-4 pt-4 border-t border-white/10">
                            {user ? (
                                <button
                                    onClick={() => {
                                        handleSignOut();
                                        setMobileMenuOpen(false);
                                    }}
                                    className="flex w-full items-center space-x-2 text-red-400 hover:text-red-300 transition-colors py-2"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span>Sign Out</span>
                                </button>
                            ) : (
                                <div className="space-y-3">
                                    <Button asChild variant="ghost" className="w-full justify-start text-white hover:text-emerald-300 rounded-lg">
                                        <Link to="/signin" onClick={() => setMobileMenuOpen(false)}>
                                            Sign In
                                        </Link>
                                    </Button>
                                    <Button asChild className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-lg">
                                        <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                                            Get Started
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {mobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}
        </header>
    )
}
