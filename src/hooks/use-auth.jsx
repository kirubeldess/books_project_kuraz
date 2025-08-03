"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/auth";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
    const [session, setSession] = useState(undefined);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signUpNewUser = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signUp({ email, password });
            if (error) {
                console.error("There was a problem signing up", error);
                return { success: false, error };
            }
            return { success: true, data };
        } catch (error) {
            console.error("Signup error:", error);
            return { success: false, error };
        }
    };

    const signInUser = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) {
                console.error("Signing in error", error);
                return { success: false, error: error.message };
            }
            console.log("Signing in success", data);
            return { success: true, data };
        } catch (error) {
            console.error("Error signing in", error);
            return { success: false, error };
        }
    };

    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error("Error signing out!", error);
            }
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ? { id: session.user.id, email: session.user.email } : null);
            setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ? { id: session.user.id, email: session.user.email } : null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ session, user, loading, signUpNewUser, signInUser, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const UserAuth = useAuth;
