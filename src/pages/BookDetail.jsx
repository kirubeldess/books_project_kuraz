import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Calendar, BookOpen, Star, User, Clock } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import Header from "../components/Header";
import { useAuth } from "../hooks/use-auth";
import { useFavorites } from "../hooks/use-favorites";
import { fetchBookById, getBookCoverUrl } from "../services/booksApi";
import { PrivateRoute } from "../services/PrivateRoute";

function formatDate(dateString) {
  if (!dateString) return "Unknown";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Unknown";

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function BookDetailContent() {
  const params = useParams();
  const router = useNavigate();
  const { user } = useAuth();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  const bookId = params.id;
  const isFavorite = favorites.some((fav) => fav.book_id === bookId || fav.id === bookId);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const bookData = await fetchBookById(bookId);
        setBook(bookData);
        console.log("---------------------------------------")
        console.log(bookData)
      } catch (error) {
        console.error("Failed to fetch book:", error);
      } finally {
        setLoading(false);
      }
    };

    if (bookId) {
      fetchBook();
    }
  }, [bookId]);

  const handleFavoriteToggle = async () => {
    if (!user || !book) return;

    setFavoriteLoading(true);
    try {
      const formattedBook = {
        id: bookId,
        volumeInfo: {
          title: book.title || "Unknown Title",
          authors: book.authors?.map((a) => a.name || a) || ["Unknown Author"],
          imageLinks: {
            thumbnail: book.covers?.[0]
              ? getBookCoverUrl(book.covers[0])
              : "/placeholder.svg?height=400&width=300",
          },
          description: book.description?.value || book.description || "No description available.",


          publishedDate: book.last_modified?.value || "Unknown",
          categories: book.subjects?.slice(0, 3) || [],
        },
      };

      if (isFavorite) {
        await removeFromFavorites(bookId);
      } else {
        await addToFavorites(formattedBook);
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    } finally {
      setFavoriteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-green-50">
        <Header />
        <div className="pt-20 container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="mb-8 h-8 w-32 rounded-xl bg-gradient-to-r from-gray-200 to-gray-300"></div>
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="h-96 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 shadow-lg"></div>
              <div className="lg:col-span-2 space-y-6">
                <div className="h-10 rounded-xl bg-gradient-to-r from-gray-200 to-gray-300"></div>
                <div className="h-6 rounded-lg bg-gradient-to-r from-gray-200 to-gray-300 w-3/4"></div>
                <div className="h-32 rounded-xl bg-gradient-to-r from-gray-200 to-gray-300"></div>
                <div className="h-12 rounded-xl bg-gradient-to-r from-gray-200 to-gray-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-green-50">
        <Header />
        <div className="pt-20 container mx-auto px-4 py-8 text-center">
          <Card className="max-w-md mx-auto bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
            <CardContent className="pt-12 pb-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-6" />
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Book not found</h1>
              <p className="text-gray-600 mb-6">The book you're looking for doesn't exist or has been removed.</p>
              <Button 
                onClick={() => router(-1)} 
                className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 rounded-xl"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const title = book.title || "Unknown Title";
  const authors =
    book.authors?.map((a) => (typeof a === "string" ? a : a.name)).join(", ") || "Unknown Author";
  const description =
    book.description?.value || book.description || "No description available.";
  const image = book.covers?.[0]
    ? getBookCoverUrl(book.covers[0])
    : "/placeholder.svg?height=400&width=300";
  const rawDate = book.last_modified?.value;
  const publishedDate = formatDate(rawDate);

  const subjects = book.subjects?.slice(0, 5) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-green-50">
      <Header />
      <section className="py-8 pt-30">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <Card className="overflow-hidden shadow-2xl rounded-2xl bg-white/80 backdrop-blur-sm border-0">
                <div className="aspect-[3/4] relative group">
                  <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Button
                    size="icon"
                    className={`absolute top-4 right-4 h-12 w-12 rounded-full transition-all duration-300 shadow-lg ${
                      isFavorite
                        ? "bg-red-500 text-white hover:bg-red-600 hover:scale-110"
                        : "bg-white/90 text-gray-600 hover:bg-white hover:scale-110"
                    }`}
                    onClick={handleFavoriteToggle}
                    disabled={favoriteLoading}
                  >
                    <Heart className={`h-6 w-6 ${isFavorite ? "fill-current" : ""}`} />
                  </Button>
                </div>
              </Card>
            </div>

            {/* Book Details */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {/* Title and Author */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <h1 className="text-3xl font-bold text-gray-900 mb-3 lg:text-4xl font-exo-two">{title}</h1>
                  <div className="flex items-center space-x-2 mb-4">
                    <User className="h-5 w-5 text-emerald-600" />
                    <p className="text-xl text-gray-600">by {authors}</p>
                  </div>

                  {subjects.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {subjects.map((subject, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-full px-3 py-1"
                        >
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Book Info */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-emerald-600" />
                    Book Information
                  </h2>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-xl">
                      <Calendar className="h-6 w-6 text-emerald-600" />
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Published</p>
                        <p className="font-semibold text-gray-900">{publishedDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-xl">
                      <Clock className="h-6 w-6 text-emerald-600" />
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Type</p>
                        <p className="font-semibold text-gray-900">Book</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Star className="h-5 w-5 mr-2 text-emerald-600" />
                    About this book
                  </h2>
                  <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">
                    {typeof description === "string" ? (
                      <p className="text-lg">{description}</p>
                    ) : (
                      <div dangerouslySetInnerHTML={{ __html: description }} />
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <Button
                    onClick={handleFavoriteToggle}
                    disabled={favoriteLoading}
                    className={`w-full h-14 text-lg font-semibold rounded-xl transition-all duration-300 ${
                      isFavorite
                        ? "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl"
                        : "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl"
                    }`}
                  >
                    <Heart className={`mr-3 h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function BookDetailPage() {
  return (
    <PrivateRoute>
      <BookDetailContent />
    </PrivateRoute>
  );
}
