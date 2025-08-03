import { Heart, BookOpen } from "lucide-react"
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
        <div className="min-h-screen ">
            <Header />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-red-500 to-pink-600">
                            <Heart className="h-6 w-6 text-white fill-current" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
                            <p className="text-gray-600">
                                {loading ? "Loading..." : `${favorites.length} book${favorites.length !== 1 ? "s" : ""} saved`}
                            </p>
                        </div>
                    </div>
                </div>

                {loading && (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="h-64 rounded-lg bg-gray-200"></div>
                                <div className="mt-4 space-y-2">
                                    <div className="h-4 rounded bg-gray-200"></div>
                                    <div className="h-3 rounded bg-gray-200"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && favorites.length === 0 && (
                    <Card className="mx-auto max-w-md text-center">
                        <CardContent className="pt-12 pb-12">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mx-auto mb-6">
                                <Heart className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No favorites yet</h3>
                            <p className="text-gray-600 mb-6">
                                Start exploring books and add them to your favorites to see them here
                            </p>
                            <Button
                                onClick={() => router("/")}
                                className="bg-green-800 hover:bg-green-700 text-white"
                            >
                                <BookOpen className="mr-2 h-4 w-4" />
                                Discover Books
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {!loading && favorites.length > 0 && (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {favorites.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                )}
            </div>
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
