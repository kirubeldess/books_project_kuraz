import { BookOpen, Facebook, Twitter, Instagram, Mail, MapPin, Phone, ArrowRight, Heart, Users, Award } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Link } from "react-router-dom"

export default function Footer() {
    return (<>
    
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
            
            <div className="relative z-10">
                <div className="container mx-auto px-4 py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {/* Brand Section */}
                        <div className="space-y-6">
                            <Link to="/" className="flex items-center space-x-3 group">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 shadow-lg group-hover:shadow-xl transition-all duration-300">
                                    <BookOpen className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-2xl font-bold font-exo-two">BookVerse</span>
                            </Link>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                Discover your next favorite book with BookVerse. Join millions of readers exploring the world's largest
                                collection of books and stories.
                            </p>
                            <div className="flex space-x-4">
                                <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200">
                                    <Facebook className="h-5 w-5" />
                                </Button>
                                <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200">
                                    <Twitter className="h-5 w-5" />
                                </Button>
                                <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200">
                                    <Instagram className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-white">Quick Links</h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group">
                                        <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/categories" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group">
                                        <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                                        Categories
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/search" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group">
                                        <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                                        Search Books
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/favorites" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group">
                                        <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                                        My Favorites
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Popular Categories */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-white">Popular Categories</h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link to="/search?q=fiction" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group">
                                        <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                                        Fiction
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/search?q=science" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group">
                                        <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                                        Science
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/search?q=history" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group">
                                        <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                                        History
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/search?q=romance" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group">
                                        <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                                        Romance
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-white">Stay Updated</h3>
                            <p className="text-gray-300 leading-relaxed">
                                Subscribe to our newsletter for book recommendations and updates.
                            </p>
                            <div className="space-y-3">
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-xl focus:ring-2 focus:ring-emerald-500/50 backdrop-blur-sm"
                                    />
                                </div>
                                <Button className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                                    Subscribe
                                </Button>
                            </div>
                        </div>
                    </div>
                    
                </div>

                {/* Bottom Section */}
                <div className="border-t border-white/10">
                    <div className="container mx-auto px-4 py-8">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <div className="text-gray-300 text-sm">
                                © 2024 BookVerse. All rights reserved. Made with <Heart className="inline h-4 w-4 text-red-500" /> for readers.
                            </div>
                            <div className="flex space-x-8 text-sm">
                                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors duration-200">
                                    Privacy Policy
                                </Link>
                                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors duration-200">
                                    Terms of Service
                                </Link>
                                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        </>
    )
}
