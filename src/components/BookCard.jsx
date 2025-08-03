import { useState } from "react";
import { Heart, Star, BookOpen, Bookmark } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { useAuth } from "../hooks/use-auth";
import { useFavorites } from "../hooks/use-favorites";
import { Link } from "react-router-dom";

export default function BookCard({ book, viewMode = "grid" }) {
    const { user } = useAuth();
    const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
    const [isLoading, setIsLoading] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const isFavorite = favorites.some(
        (fav) => fav.book_id === book.id || fav.id === book.id
    );

    const title = book.volumeInfo.title || "Unknown Title";
    const authors = book.volumeInfo.authors?.join(", ") || "Unknown Author";
    const image =
        book.volumeInfo.imageLinks?.thumbnail || "/placeholder.svg?height=300&width=200";
    const rating = book.volumeInfo.averageRating || 0;
    const category = book.volumeInfo.categories?.[0] || "";
    const year = book.volumeInfo.publishedDate?.split("-")[0] || "Unknown Year";

    const handleFavoriteToggle = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) return;

        setIsLoading(true);
        try {
            if (isFavorite) {
                await removeFromFavorites(book.id);
            } else {
                await addToFavorites(book);
            }
        } catch (error) {
            console.error("Failed to toggle favorite:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (viewMode === "list") {
        return (
            <Card
                className="group hover:shadow-lg transition-all duration-300 rounded-xl border border-gray-100 overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Link to={`/book/${book.id}`} className="flex gap-4 p-4 items-start">
                    <div className="relative flex-shrink-0 w-20 h-28 rounded-lg overflow-hidden">
                        <img
                            src={image}
                            alt={title}
                            className={`w-full h-full object-cover transition-transform duration-300 ${isHovered ? "scale-105" : ""}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>

                    <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex justify-between items-start">
                            <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-green-600 transition-colors">
                                {title}
                            </h3>
                            {user && (
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className={`h-6 w-6 rounded-full ${isFavorite ? "text-red-500" : "text-gray-400"} hover:bg-gray-100`}
                                    onClick={handleFavoriteToggle}
                                    disabled={isLoading}
                                >
                                    <Heart className={`h-3 w-3 ${isFavorite ? "fill-current" : ""}`} />
                                </Button>
                            )}
                        </div>

                        <p className="text-sm text-gray-600 line-clamp-1">{authors}</p>

                        <div className="flex items-center gap-3">
                            {rating > 0 && (
                                <div className="flex items-center gap-1">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-3 w-3 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs text-gray-500">{rating.toFixed(1)}</span>
                                </div>
                            )}

                            {category && (
                                <Badge variant="outline" className="text-xs font-normal">
                                    {category}
                                </Badge>
                            )}
                        </div>

                        <div className="flex items-center justify-between pt-1">
                            <span className="text-xs text-gray-500">{year}</span>
                            <BookOpen className="h-4 w-4 text-gray-400" />
                        </div>
                    </div>
                </Link>
            </Card>
        );
    }

    return (
        <Card
            className="group hover:shadow-xl transition-all duration-300 rounded-xl border border-gray-100 overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link to={`/book/${book.id}`}>
                <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? "scale-110" : ""}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />

                    <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                        {category && (
                            <Badge className="bg-white text-gray-900 text-xs font-medium shadow-sm">
                                {category}
                            </Badge>
                        )}

                        {user && (
                            <Button
                                size="icon"
                                variant="ghost"
                                className={`h-8 w-8 rounded-full shadow-sm ${isFavorite ? "bg-red-500 text-white hover:bg-red-600" : "bg-white/90 text-gray-600 hover:bg-white"}`}
                                onClick={handleFavoriteToggle}
                                disabled={isLoading}
                            >
                                <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
                            </Button>
                        )}
                    </div>


                </div>

                <CardContent className="p-4 space-y-2">
                    <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-green-600 transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-1">{authors}</p>

                    <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                            {rating > 0 && (
                                <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    <span className="text-xs text-gray-600">{rating.toFixed(1)}</span>
                                </div>
                            )}
                            <span className="text-xs text-gray-500">{year}</span>
                        </div>

                        <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Bookmark className="h-3 w-3" />
                            <span>Save</span>
                        </div>
                    </div>
                </CardContent>
            </Link>
        </Card>
    );
}