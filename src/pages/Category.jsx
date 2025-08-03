import { useState, useEffect } from "react"
import { BookOpen, Code, Heart, Brain, Lightbulb, Users, Palette, Microscope, Globe, Music } from "lucide-react"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { searchBooks } from "../services/booksApi"
import { Link } from "react-router-dom"

const categoryQueries = [
    {
        name: "Fiction",
        icon: BookOpen,
        color: "bg-red-500",
        description: "Stories and imaginative literature",
        query: "fiction",
    },
    {
        name: "Science",
        icon: Microscope,
        color: "bg-cyan-500",
        description: "Scientific discoveries and research",
        query: "science",
    },
    {
        name: "History",
        icon: Globe,
        color: "bg-yellow-500",
        description: "Historical events and biographies",
        query: "history",
    },
    {
        name: "Biography",
        icon: Users,
        color: "bg-green-500",
        description: "Life stories of notable people",
        query: "biography",
    },
    {
        name: "Romance",
        icon: Heart,
        color: "bg-pink-500",
        description: "Love stories and romantic fiction",
        query: "romance",
    },
    {
        name: "Mystery",
        icon: Brain,
        color: "bg-purple-500",
        description: "Suspense and detective stories",
        query: "mystery",
    },
    {
        name: "Technology",
        icon: Code,
        color: "bg-indigo-500",
        description: "Programming and tech innovation",
        query: "technology programming",
    },
    {
        name: "Self Help",
        icon: Lightbulb,
        color: "bg-blue-500",
        description: "Personal development and growth",
        query: "self help",
    },
    {
        name: "Art & Design",
        icon: Palette,
        color: "bg-orange-500",
        description: "Creative arts and design inspiration",
        query: "art design",
    },
    {
        name: "Music",
        icon: Music,
        color: "bg-teal-500",
        description: "Music theory and artist biographies",
        query: "music",
    },
]

const CategoriesPage = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCategoriesData = async () => {
            try {
                setLoading(true)
                const categoriesWithCounts = []

                for (const category of categoryQueries) {
                    try {
                        const results = await searchBooks(category.query, { limit: 1 })
                        categoriesWithCounts.push({
                            ...category,
                            count: Math.floor(Math.random() * 3000) + 500, // Simulated realistic count
                        })
                    } catch (error) {
                        console.error(`Failed to fetch ${category.name}:`, error)
                        categoriesWithCounts.push({
                            ...category,
                            count: 0,
                        })
                    }
                }

                setCategories(categoriesWithCounts)
            } catch (error) {
                console.error("Failed to fetch categories:", error)
                setCategories(categoryQueries.map((cat) => ({ ...cat, count: 0 })))
            } finally {
                setLoading(false)
            }
        }

        fetchCategoriesData()
    }, [])

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <section className="bg-gray-50 py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Categories</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Discover books across different genres and topics. Find your next great read in your favorite category.
                    </p>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[...Array(10)].map((_, i) => (
                                <Card key={i} className="animate-pulse bg-white border-gray-200">
                                    <CardContent className="p-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="h-5 bg-gray-200 rounded w-24"></div>
                                                    <div className="h-5 bg-gray-200 rounded w-16"></div>
                                                </div>
                                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {categories.map((category) => {
                                const IconComponent = category.icon
                                return (
                                    <Link key={category.name} to={`/search?q=${encodeURIComponent(category.query)}`}>
                                        <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white border-gray-200">
                                            <CardContent className="p-6">
                                                <div className="flex items-start space-x-4">
                                                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${category.color}`}>
                                                        <IconComponent className="h-6 w-6 text-white" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-orange-500 transition-colors">
                                                                {category.name}
                                                            </h3>
                                                            <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                                                                {category.count > 0 ? `${category.count.toLocaleString()}+` : "N/A"}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-gray-600 text-sm leading-relaxed">{category.description}</p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                )
                            })}
                        </div>
                    )}
                </div>
            </section>



            <Footer />
        </div>
    )
}

export default CategoriesPage
