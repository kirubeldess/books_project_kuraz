import { useState } from "react";
import { Heart, Star, BookOpen, Calendar, User } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { UserAuth } from "../services/AuthContext";
import { useFavorites } from "../hooks/use-favorites";
import { Link } from "react-router-dom";

export default function BookCard({ book, viewMode = "grid" }) {
    const { session } = UserAuth();
    const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
    const [isLoading, setIsLoading] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const user = session?.user;

    const isFavorite = favorites.some(
        (fav) => fav.book_id === book.id || fav.id === book.id
    );

    const title = book.volumeInfo?.title || book.volume_info?.title || "Unknown Title";
    const authors = book.volumeInfo?.authors?.join(", ") || book.volume_info?.authors?.join(", ") || "Unknown Author";
    const image =
        book.volumeInfo?.imageLinks?.thumbnail || book.volume_info?.imageLinks?.thumbnail || "/placeholder.svg?height=300&width=200";
    const rating = book.volumeInfo?.averageRating || book.volume_info?.averageRating || 0;
    const category = book.volumeInfo?.categories?.[0] || book.volume_info?.categories?.[0] || "";
    const year = book.volumeInfo?.publishedDate?.split("-")[0] || book.volume_info?.publishedDate?.split("-")[0] || "Unknown Year";

    const handleFavoriteToggle = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            console.log("User must be signed in to add favorites");
            return;
        }

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
                className="group hover:shadow-2xl transition-all duration-300 rounded-2xl border-0 bg-white overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Link to={`/book/${book.id}`} className="flex gap-6 p-6 items-start">
                    <div className="relative flex-shrink-0 w-24 h-32 rounded-xl overflow-hidden shadow-lg">
                        <img
                            src={image}
                            alt={title}
                            className={`w-full h-full object-cover transition-transform duration-300 ${isHovered ? "scale-110" : ""}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>

                    <div className="flex-1 min-w-0 space-y-3">
                        <div className="flex justify-between items-start">
                            <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition-colors text-lg">
                                {title}
                            </h3>
                            {user && (
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className={`h-8 w-8 rounded-full ${isFavorite ? "text-red-500 bg-red-50" : "text-gray-400"} hover:bg-gray-100 transition-all duration-200`}
                                    onClick={handleFavoriteToggle}
                                    disabled={isLoading}
                                >
                                    <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
                                </Button>
                            )}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <User className="h-4 w-4" />
                            <span className="line-clamp-1">{authors}</span>
                        </div>

                        <div className="flex items-center gap-4">
                            {rating > 0 && (
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
                                </div>
                            )}

                            {category && (
                                <Badge className="bg-emerald-100 text-emerald-800 text-xs font-medium px-3 py-1 rounded-full">
                                    {category}
                                </Badge>
                            )}
                        </div>

                        <div className="flex items-center gap-4 pt-2">
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                <Calendar className="h-4 w-4" />
                                <span>{year}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                <BookOpen className="h-4 w-4" />
                                <span>Available</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </Card>
        );
    }

    return (
        <Card
            className="group hover:shadow-2xl transition-all duration-300 rounded-2xl border-0 bg-white overflow-hidden hover:scale-105"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link to={`/book/${book.id}`}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-t-2xl -mt-6">
                    <img
                        src={image}
                        alt={title}
                        className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? "scale-110" : ""}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                        {category && (
                            <Badge className="bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-medium shadow-lg px-3 py-1 rounded-full">
                                {category}
                            </Badge>
                        )}
                    </div>
                </div>

                <CardContent className="p-4 space-y-3 -mb-5">
                    <div className="space-y-2">
                        <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition-colors text-sm leading-tight">
                            {title}
                        </h3>
                        
                        {rating > 0 && (
                            <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs font-medium text-gray-700">{rating.toFixed(1)}</span>
                            </div>
                        )}
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                        <User className="h-3 w-3" />
                        <span className="line-clamp-1">{authors}</span>
                    </div>

                    <div className="flex items-center justify-between ">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Calendar className="h-3 w-3" />
                                <span>{year}</span>
                            </div>
                        </div>

                        {user && (
                            <Button
                                size="icon"
                                variant="ghost"
                                className={`h-6 w-6 rounded-full ${isFavorite ? "text-red-500" : "text-gray-400"} hover:bg-gray-100 transition-all duration-200`}
                                onClick={handleFavoriteToggle}
                                disabled={isLoading}
                            >
                                <Heart className={`h-3 w-3 ${isFavorite ? "fill-current" : ""}`} />
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Link>
        </Card>
    );
}