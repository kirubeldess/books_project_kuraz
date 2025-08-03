"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/auth";
import { UserAuth } from "../services/AuthContext";

const FavoritesContext = createContext(undefined);

export function FavoritesProvider({ children }) {
    const { session } = UserAuth();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);

    const user = session?.user;

    useEffect(() => {
        if (user) {
            console.log("User authenticated, fetching favorites for:", user.id);
            fetchFavorites();
        } else {
            console.log("No user, clearing favorites");
            setFavorites([]);
        }
    }, [user]);

    const fetchFavorites = async () => {
        if (!user) return;

        setLoading(true);
        try {
            console.log("Fetching favorites for user:", user.id);
            const { data, error } = await supabase
                .from("favorites")
                .select("*")
                .eq("user_id", user.id);

            if (error) {
                console.error("Supabase error:", error);
                throw error;
            }
            
            console.log("Fetched favorites:", data);
            
            // Transform the data to match the expected book structure
            const transformedFavorites = (data || []).map(favorite => ({
                id: favorite.book_id,
                volumeInfo: favorite.volume_info,
                ...favorite
            }));
            
            setFavorites(transformedFavorites);
        } catch (error) {
            console.error("Error fetching favorites:", error);
        } finally {
            setLoading(false);
        }
    };

    const addToFavorites = async (book) => {
        if (!user) {
            console.log("No user, cannot add to favorites");
            return;
        }

        try {
            console.log("Adding book to favorites:", book.id, "for user:", user.id);
            const favoriteData = {
                user_id: user.id,
                book_id: book.id,
                volume_info: book.volumeInfo,
                created_at: new Date().toISOString()
            };

            console.log("Favorite data to insert:", favoriteData);

            const { data, error } = await supabase.from("favorites").insert([favoriteData]);

            if (error) {
                console.error("Supabase insert error:", error);
                throw error;
            }

            console.log("Successfully added to favorites:", data);
            
            // Add to local state with proper structure
            const newFavorite = {
                id: book.id,
                book_id: book.id,
                user_id: user.id,
                volumeInfo: book.volumeInfo,
                volume_info: book.volumeInfo,
                created_at: favoriteData.created_at
            };
            
            setFavorites((prev) => [...prev, newFavorite]);
        } catch (error) {
            console.error("Error adding to favorites:", error);
            throw error;
        }
    };

    const removeFromFavorites = async (bookId) => {
        if (!user) return;

        try {
            console.log("Removing book from favorites:", bookId, "for user:", user.id);
            const { error } = await supabase
                .from("favorites")
                .delete()
                .eq("user_id", user.id)
                .eq("book_id", bookId);

            if (error) {
                console.error("Supabase delete error:", error);
                throw error;
            }

            console.log("Successfully removed from favorites");
            setFavorites((prev) => prev.filter((fav) => fav.book_id !== bookId && fav.id !== bookId));
        } catch (error) {
            console.error("Error removing from favorites:", error);
            throw error;
        }
    };

    return (
        <FavoritesContext.Provider
            value={{ favorites, loading, addToFavorites, removeFromFavorites }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error("useFavorites must be used within a FavoritesProvider");
    }
    return context;
}
