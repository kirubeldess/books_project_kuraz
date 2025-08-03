"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/auth";
import { useAuth } from "./use-auth";

const FavoritesContext = createContext(undefined);

export function FavoritesProvider({ children }) {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            fetchFavorites();
        } else {
            setFavorites([]);
        }
    }, [user]);

    const fetchFavorites = async () => {
        if (!user) return;

        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("favorites")
                .select("*")
                .eq("user_id", user.id);

            if (error) throw error;
            setFavorites(data || []);
        } catch (error) {
            console.error("Error fetching favorites:", error);
        } finally {
            setLoading(false);
        }
    };

    const addToFavorites = async (book) => {
        if (!user) return;

        try {
            const favoriteData = {
                user_id: user.id,
                book_id: book.id,
                id: book.id,
                volume_info: book.volumeInfo,
            };

            const { error } = await supabase.from("favorites").insert([favoriteData]);

            if (error) throw error;
            setFavorites((prev) => [...prev, favoriteData]);
        } catch (error) {
            console.error("Error adding to favorites:", error);
            throw error;
        }
    };

    const removeFromFavorites = async (bookId) => {
        if (!user) return;

        try {
            const { error } = await supabase
                .from("favorites")
                .delete()
                .eq("user_id", user.id)
                .eq("book_id", bookId);

            if (error) throw error;
            setFavorites((prev) => prev.filter((fav) => fav.book_id !== bookId));
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
