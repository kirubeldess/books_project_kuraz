import { Heart, BookOpen, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import Header from "../components/Header"
import BookCard from "../components/BookCard"
import { PrivateRoute } from "../services/PrivateRoute"
import { useFavorites } from "../hooks/use-favorites"
import { useNavigate } from "react-router-dom"

function FavoritesContent() {
    const { favorites, loading } = useFavorites()
    const router = useNavigate()

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-green-50">
            <Header />

            {/* Hero Section with proper spacing from navbar */}
            <section className="pt-20 pb-12 bg-gradient-to-r from-emerald-600/10 via-green-600/10 to-teal-600/10">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex items-center justify-center mb-6">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 shadow-lg">
                                <Heart className="h-8 w-8 text-white fill-current" />
                            </div>
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-exo-two">
                            My Favorites
                        </h1>
                        
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            {loading 
                                ? "Loading your favorite books..." 
                                : favorites.length === 0 
                                    ? "Your personal collection of beloved books starts here"
                                    : `You have ${favorites.length} amazing book${favorites.length !== 1 ? "s" : ""} in your collection`
                            }
                        </p>

                        {/* Quick Stats */}
                        {!loading && favorites.length > 0 && (
                            <div className="flex justify-center items-center space-x-8 text-gray-600">
                                <div className="flex items-center space-x-2">
                                    <Sparkles className="h-5 w-5 text-emerald-600" />
                                    <span className="text-sm font-medium">{favorites.length} Books</span>
                                </div>
                                <div className="w-px h-4 bg-gray-300"></div>
                                <div className="flex items-center space-x-2">
                                    <BookOpen className="h-5 w-5 text-emerald-600" />
                                    <span className="text-sm font-medium">Personal Collection</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    {loading && (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="animate-pulse">
                                    <div className="aspect-[3/4] bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl mb-4 shadow-sm"></div>
                                    <div className="space-y-2">
                                        <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                                        <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {!loading && favorites.length === 0 && (
                        <Card className="mx-auto max-w-md text-center bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
                            <CardContent className="pt-16 pb-16">
                                <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Heart className="h-10 w-10 text-emerald-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">No favorites yet</h3>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    Start exploring books and add them to your favorites to build your personal collection. 
                                    Your favorite books will appear here for easy access.
                                </p>
                                <Button
                                    onClick={() => router("/")}
                                    className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-xl px-6 shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <BookOpen className="mr-2 h-4 w-4" />
                                    Discover Books
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {!loading && favorites.length > 0 && (
                        <>
                            <div className="mb-8 text-center">
                                <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-xl px-6 py-3 shadow-sm">
                                    <Heart className="h-5 w-5 text-emerald-600" />
                                    <p className="text-gray-700 font-medium">
                                        Your <span className="text-emerald-800 font-bold">{favorites.length}</span> favorite book{favorites.length !== 1 ? "s" : ""}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {favorites.map((book) => (
                                    <BookCard key={book.id} book={book} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>
        </div>
    )
}

export default function FavoritesPage() {
    return (
        <PrivateRoute>
            <FavoritesContent />
        </PrivateRoute>
    )
}
