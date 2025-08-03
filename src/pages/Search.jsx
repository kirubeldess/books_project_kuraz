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
        <div className="min-h-screen bg-white">
            <Header />

            <section className="bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                            {initialQuery
                                ? `Search Results for "${initialQuery}"`
                                : "Search Books"}
                        </h1>

                        <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
                            <Input
                                type="text"
                                placeholder="Search for books, authors, or topics..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 h-12"
                            />
                            <Button
                                type="submit"
                                size="lg"
                                className="h-12 px-8 bg-orange-500 hover:bg-orange-600"
                            >
                                <Search className="h-5 w-5" />
                            </Button>
                        </form>

                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger className="w-40">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="relevance">Relevance</SelectItem>
                                        <SelectItem value="newest">Newest</SelectItem>
                                        <SelectItem value="oldest">Oldest</SelectItem>
                                        <SelectItem value="rating">Rating</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Button variant="outline" size="sm">
                                    <Filter className="h-4 w-4 mr-2" />
                                    Filters
                                </Button>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant={viewMode === "grid" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setViewMode("grid")}
                                >
                                    <Grid className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant={viewMode === "list" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setViewMode("list")}
                                >
                                    <List className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12">
                <div className="container mx-auto px-4">
                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {[...Array(20)].map((_, i) => (
                                <div key={i} className="animate-pulse">
                                    <div className="aspect-[3/4] bg-gray-200 rounded-lg mb-4"></div>
                                    <div className="space-y-2">
                                        <div className="h-4 bg-gray-200 rounded"></div>
                                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : books.length > 0 ? (
                        <>
                            <div className="mb-6">
                                <p className="text-gray-600">
                                    Found {books.length} results{" "}
                                    {initialQuery && `for "${initialQuery}"`}
                                </p>
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
                        <Card className="max-w-md mx-auto text-center">
                            <CardContent className="pt-12 pb-12">
                                <Search className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    No books found
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Try searching with different keywords or check your spelling
                                </p>
                                <Button onClick={() => setSearchQuery("")} variant="outline">
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
