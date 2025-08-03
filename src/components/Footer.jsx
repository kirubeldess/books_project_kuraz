import { BookOpen, Facebook, Twitter, Instagram } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Link } from "react-router-dom"

export default function Footer() {
    return (
        <footer className="bg-green-900 text-white">

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-500">
                                <BookOpen className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold">BookVerse</span>
                        </Link>
                        <p className="text-gray-400 leading-relaxed">
                            Discover your next favorite book with BookVerse. Join millions of readers exploring the world's largest
                            collection of books.
                        </p>
                        <div className="flex space-x-4">
                            <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white hover:bg-slate-800">
                                <Facebook className="h-5 w-5" />
                            </Button>
                            <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white hover:bg-slate-800">
                                <Twitter className="h-5 w-5" />
                            </Button>
                            <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white hover:bg-slate-800">
                                <Instagram className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/categories" className="text-gray-400 hover:text-white transition-colors">
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <Link to="/search" className="text-gray-400 hover:text-white transition-colors">
                                    Search Books
                                </Link>
                            </li>
                            <li>
                                <Link to="/favorites" className="text-gray-400 hover:text-white transition-colors">
                                    My Favorites
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Popular Categories</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/categories/fiction" className="text-gray-400 hover:text-white transition-colors">
                                    Fiction
                                </Link>
                            </li>
                            <li>
                                <Link to="/categories/non-fiction" className="text-gray-400 hover:text-white transition-colors">
                                    Non-Fiction
                                </Link>
                            </li>
                            <li>
                                <Link to="/categories/science" className="text-gray-400 hover:text-white transition-colors">
                                    Science
                                </Link>
                            </li>
                            <li>
                                <Link to="/categories/business" className="text-gray-400 hover:text-white transition-colors">
                                    Business
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Stay Updated</h3>
                        <p className="text-gray-400">Subscribe to our newsletter for book recommendations and updates.</p>
                        <div className="space-y-2">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white border-none text-black placeholder:text-gray-400"
                            />
                            <Button className="w-full bg-orange-500 hover:bg-orange-600">Subscribe</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-slate-800">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-gray-400 text-sm">© 2024 BookVerse. All rights reserved.</div>
                        <div className="flex space-x-6 text-sm">
                            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                                Terms of Service
                            </Link>
                            <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
