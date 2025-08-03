
import { useState, useEffect } from "react"
import { Search, ArrowRight } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent } from "../components/ui/card"
import { useAuth } from "../hooks/use-auth"
import BookCard from "../components/BookCard"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { searchBooks, formatOpenLibraryBook } from "../services/booksApi"
import { Link, useNavigate } from "react-router-dom"
import book from "../assets/book.png"

const categories = [
    { name: "Fiction", icon: "📚", query: "fiction" },
    { name: "Science", icon: "🔬", query: "science" },
    { name: "History", icon: "📜", query: "history" },
    { name: "Biography", icon: "👤", query: "biography" },
    { name: "Romance", icon: "💕", query: "romance" },
    { name: "Mystery", icon: "🔍", query: "mystery" },
]

export default function HomePage() {
    const { user } = useAuth()
    const router = useNavigate()
    const [searchQuery, setSearchQuery] = useState("")
    const [featuredBooks, setFeaturedBooks] = useState([])
    const [loading, setLoading] = useState(true)
    const [categoriesData, setCategoriesData] = useState([])
    const [categoriesLoading, setCategoriesLoading] = useState(true)

    useEffect(() => {
        const fetchFeaturedBooks = async () => {
            try {
                setLoading(true)

                const queries = ["bestseller fiction", "classic literature", "science fiction", "mystery thriller"]

                const allBooks = []

                for (const query of queries) {
                    const results = await searchBooks(query, { limit: 4 })
                    const formattedBooks = results.slice(0, 2).map(formatOpenLibraryBook)
                    allBooks.push(...formattedBooks)
                }

                setFeaturedBooks(allBooks.slice(0, 8))
            } catch (error) {
                console.error("Failed to fetch featured books:", error)
                setFeaturedBooks([])
            } finally {
                setLoading(false)
            }
        }

        fetchFeaturedBooks()
    }, [])

    useEffect(() => {
        const fetchCategoriesData = async () => {
            try {
                setCategoriesLoading(true)
                const categoriesWithCounts = []

                for (const category of categories) {
                    const results = await searchBooks(category.query, { limit: 1 })
                    categoriesWithCounts.push({
                        ...category,
                        count: Math.floor(Math.random() * 2000) + 500,
                    })
                }

                setCategoriesData(categoriesWithCounts)
            } catch (error) {
                console.error("Failed to fetch categories:", error)
                setCategoriesData(categories.map((cat) => ({ ...cat, count: 0 })))
            } finally {
                setCategoriesLoading(false)
            }
        }

        fetchCategoriesData()
    }, [])

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!searchQuery.trim()) return

        router(`/search?q=${encodeURIComponent(searchQuery)}`)
    }

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <section className="relative bg-green-100 text-green-800 overflow-hidden pb-5">
                <div
                    className="lg:hidden absolute inset-0 bg-no-repeat bg-cover bg-center opacity-10"
                    style={{ backgroundImage: `url(${book})` }}
                ></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="justify-center lg:text-start lg:flex lg:justify-between gap-12 items-center py-12">
                        <div className="space-y-8 w-full lg:w-1/2">
                            <div className="space-y-4">
                                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                                    The more that you read, the more things you'll know.
                                </h1>
                                <p className="text-xl text-gray-700 leading-relaxed">
                                    "The more that you learn, the more places you'll go."
                                </p>
                            </div>

                            <form onSubmit={handleSearch} className="flex gap-3 max-w-md">
                                <Input
                                    type="text"
                                    placeholder="Search for books..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="flex-1 h-12 bg-white text-black border-0"
                                />
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="h-12 px-8 bg-green-800 hover:bg-green-700 text-white"
                                >
                                    <Search className="h-5 w-5" />
                                </Button>
                            </form>
                        </div>

                        <div className="hidden lg:flex">
                            <img src={book} alt="Person reading" className="rounded-2xl" />
                        </div>
                    </div>

                    <div className="flex gap-8 w-full relative z-10">
                        <div>
                            <div className="text-2xl font-bold">10M+</div>
                            <div className="text-gray-400">Books</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold">500K+</div>
                            <div className="text-gray-400">Readers</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold">50K+</div>
                            <div className="text-gray-400">Authors</div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Categories</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Discover books across different genres and find your next favorite read
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {categoriesLoading
                            ? [...Array(6)].map((_, i) => (
                                <Card key={i} className="animate-pulse bg-green-100 border-gray-200">
                                    <CardContent className="p-6 text-center">
                                        <div className="w-8 h-8 bg-gray-200 rounded mx-auto mb-3"></div>
                                        <div className="h-4 bg-gray-200 rounded mb-1"></div>
                                        <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto"></div>
                                    </CardContent>
                                </Card>
                            ))
                            : categoriesData.map((category, index) => (
                                <Link key={index} to={`/search?q=${encodeURIComponent(category.query)}`}>
                                    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer bg-green-50">
                                        <CardContent className=" text-center">
                                            <div className="text-3xl mb-3">{category.icon}</div>
                                            <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-orange-500 transition-colors">
                                                {category.name}
                                            </h3>
                                            <p className="text-sm text-gray-500">{category.count}+ books</p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">What Will You Discover?</h2>
                            <p className="text-gray-600">Popular books that readers love</p>
                        </div>
                        <Button variant="outline" asChild className="hidden md:flex bg-transparent">
                            <Link to="/search?q=bestseller">
                                View All <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="animate-pulse">
                                    <div className="aspect-[3/4] bg-gray-200 rounded-lg mb-4"></div>
                                    <div className="space-y-2">
                                        <div className="h-4 bg-gray-200 rounded"></div>
                                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : featuredBooks.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                            {featuredBooks.map((book) => (
                                <BookCard key={book.id} book={book} />
                            ))}
                        </div>
                    ) : (
                        <Card className="max-w-md mx-auto text-center">
                            <CardContent className="pt-12 pb-12">
                                <div className="text-gray-400 mb-4">📚</div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to load featured books</h3>
                                <p className="text-gray-600 mb-4">Please try again later or search for books directly</p>
                                <Button asChild variant="outline">
                                    <Link to="/search">Browse Books</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    <div className="text-center mt-12 md:hidden">
                        <Button variant="outline" asChild>
                            <Link to="/search?q=bestseller">
                                View All Books <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {!user && (
                <section className="py-20 bg-green-900/80 text-white">
                    <div className="container mx-auto px-4 text-center">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Reading Journey?</h2>
                            <p className="text-xl text-gray-300 mb-8">
                                Join thousands of book lovers and create your personalized library today
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                                    <Link to="/register">Get Started Free</Link>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    size="lg"
                                    className="border-white text-white hover:bg-white hover:text-slate-900 bg-transparent"
                                >
                                    <Link to="/login">Sign In</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </div>
    )
}
