import { useState, useEffect } from "react";
import { Search, Filter, Grid, List } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookCard from "../components/BookCard";
import { searchBooks, formatOpenLibraryBook } from "../services/booksApi";
import { useSearchParams } from "react-router-dom";

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const initialQuery = searchParams.get("q") || "";

    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [viewMode, setViewMode] = useState("grid");
    const [sortBy, setSortBy] = useState("relevance");

    useEffect(() => {
        if (initialQuery) {
            handleSearch(initialQuery);
        }
    }, [initialQuery]);

    const handleSearch = async (query = searchQuery) => {
        if (!query.trim()) return;

        setLoading(true);
        try {
            const results = await searchBooks(query, { limit: 40 });
            const formattedBooks = results.map(formatOpenLibraryBook);
            setBooks(formattedBooks);
        } catch (error) {
            console.error("Search failed:", error);
            setBooks([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <Header />
            <section className="pt-20 pb-12 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
                            {initialQuery
                                ? `Search Results for "${initialQuery}"`
                                : "Search Books"}
                        </h1>

                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-8 max-w-2xl mx-auto">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Search for books, authors, or topics..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="h-12 pl-12 pr-4 bg-white/80 backdrop-blur-sm border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                                />
                            </div>
                            <Button
                                type="submit"
                                size="lg"
                                className="h-12 px-8 bg-gradient-to-r from-emerald-800 to-emerald-600 hover:bg-emerald-700 hover:to-ermerald-500 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <Search className="h-5 w-5" />
                            </Button>
                        </form>

                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
                            <div className="flex items-center gap-4">
                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger className="w-40 bg-white/80 border-gray-200 rounded-lg">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="relevance">Relevance</SelectItem>
                                        <SelectItem value="newest">Newest</SelectItem>
                                        <SelectItem value="oldest">Oldest</SelectItem>
                                        <SelectItem value="rating">Rating</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Button variant="outline" size="sm" className="bg-white/80 border-gray-200 rounded-lg hover:bg-white">
                                    <Filter className="h-4 w-4 mr-2" />
                                    Filters
                                </Button>
                            </div>

                            <div className="flex items-center gap-2 bg-white/80 rounded-lg p-1">
                                <Button
                                    variant={viewMode === "grid" ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => setViewMode("grid")}
                                    className={`rounded-md ${viewMode === "grid" ? "bg-gradient-to-r from-emerald-500 to-emerald-500 text-white shadow-md" : "hover:bg-gray-100"}`}
                                >
                                    <Grid className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant={viewMode === "list" ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => setViewMode("list")}
                                    className={`rounded-md ${viewMode === "list" ? "bg-gradient-to-r from-emerald-500 to-emerald-700 text-white shadow-md" : "hover:bg-gray-100"}`}
                                >
                                    <List className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Results Section */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {[...Array(20)].map((_, i) => (
                                <div key={i} className="animate-pulse">
                                    <div className="aspect-[3/4] bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl mb-4 shadow-sm"></div>
                                    <div className="space-y-2">
                                        <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                                        <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : books.length > 0 ? (
                        <>
                            <div className="mb-6 text-center">
                                <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 shadow-sm">
                                    <p className="text-gray-700 font-medium">
                                        Found <span className="text-emerald-800 font-bold">{books.length}</span> results
                                        {initialQuery && (
                                            <>
                                                {" "}for <span className="text-emerald-600 font-semibold">"{initialQuery}"</span>
                                            </>
                                        )}
                                    </p>
                                </div>
                            </div>

                            <div
                                className={`grid gap-6 ${viewMode === "grid"
                                    ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                                    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                                    }`}
                            >
                                {books.map((book) => (
                                    <BookCard key={book.id} book={book} viewMode={viewMode} />
                                ))}
                            </div>
                        </>
                    ) : initialQuery ? (
                        <Card className="max-w-md mx-auto text-center bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
                            <CardContent className="pt-12 pb-12">
                                <Search className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    No books found
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Try searching with different keywords or check your spelling
                                </p>
                                <Button 
                                    onClick={() => setSearchQuery("")} 
                                    variant="outline"
                                    className="bg-white border-gray-200 hover:bg-gray-50 rounded-lg"
                                >
                                    Clear Search
                                </Button>
                            </CardContent>
                        </Card>
                    ) : null}
                </div>
            </section>

            <Footer />
        </div>
    );
}
