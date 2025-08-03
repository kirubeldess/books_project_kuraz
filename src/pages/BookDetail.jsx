import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Calendar, BookOpen } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import Header from "../components/Header";
import { useAuth } from "../hooks/use-auth";
import { useFavorites } from "../hooks/use-favorites";
import { fetchBookById, getBookCoverUrl } from "../services/booksApi";
import { Link } from "react-router-dom";

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

export default function BookDetailPage() {
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-indigo-100">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="mb-8 h-8 w-32 rounded bg-gray-200"></div>
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="h-96 rounded-lg bg-gray-200"></div>
              <div className="lg:col-span-2 space-y-4">
                <div className="h-8 rounded bg-gray-200"></div>
                <div className="h-6 rounded bg-gray-200"></div>
                <div className="h-32 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Book not found</h1>
          <Button onClick={() => router(-1)}>Go Back</Button>
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

  // const publishedDate = book.last_modified?.value || "Unknown";
  const subjects = book.subjects?.slice(0, 5) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-indigo-100">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => router(-1)} className="mb-8 hover:bg-white/50">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card className="overflow-hidden shadow-xl">
              <div className="aspect-[3/4] relative">
                <img src={image} alt={title} className="h-full w-full object-cover" />
                {user && (
                  <Button
                    size="icon"
                    className={`absolute top-4 right-4 h-10 w-10 rounded-full transition-all ${isFavorite
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-white/80 text-gray-600 hover:bg-white"
                      }`}
                    onClick={handleFavoriteToggle}
                    disabled={favoriteLoading}
                  >
                    <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
                  </Button>
                )}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2 lg:text-4xl">{title}</h1>
                <p className="text-xl text-gray-600 mb-4">by {authors}</p>

                {subjects.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {subjects.map((subject, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-green-800 text-white"
                      >
                        {subject}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <Separator />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Published</p>
                    <p className="font-medium">{publishedDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Type</p>
                    <p className="font-medium">Book</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">About this book</h2>
                <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">
                  {typeof description === "string" ? (
                    <p>{description}</p>
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                  )}
                </div>
              </div>

              {user && (
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    onClick={handleFavoriteToggle}
                    disabled={favoriteLoading}
                    className={`flex-1 ${isFavorite
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-green-900 hover:bg-green-800"
                      }`}
                  >
                    <Heart className={`mr-2 h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                  </Button>
                </div>
              )}

              {!user && (
                <Card className="bg-gradient-to-r from-green-50 to-purple-50 border-green-200">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Want to save this book?
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Sign up to add books to your personal favorites list
                    </p>
                    <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
                      <Button asChild className="bg-gradient-to-r from-green-600 to-purple-600">
                        <Link to="/register">Sign Up</Link>
                      </Button>
                      <Button asChild variant="outline">
                        <Link to="/login">Sign In</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
