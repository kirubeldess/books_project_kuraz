import { createContext,useEffect,useState,useContext } from "react";
import {supabase} from './auth'

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [session,setSession] = useState(undefined)

    const signUpNewUser = async (email,password) => {
        const {data,error} = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if(error){
            console.error('there was a problem signing up', error);
            return {success: false, error}
        }
        return {success: true, data};
    };

    const signInUser = async (email,password) => {
        try{
            const {data,error} = await supabase.auth.signInWithPassword(
                {
                    email: email,
                    password: password,
                }
            );
            if(error){
                console.error('signing in error',error);
                return {success: false, error: error.message}
            }
            console.log('signing in success',data);
            return {success: true, data}
        }catch(error){
            console.error('error signing in', error)
        }
    }

    useEffect(()=>{
        supabase.auth.getSession().then(({data: {session}})=>{
            setSession(session)
        });
        supabase.auth.onAuthStateChange((_event,session)=>{
            setSession(session)
        })
    },[]);

    //out

    const signOut = () => {
        const {error} = supabase.auth.signOut();
        if(error){
            console.error('error signing out!', error);
        }
    }

    return (
        <AuthContext.Provider value={{session,signUpNewUser,signInUser,signOut}}>
            {children}
        </AuthContext.Provider>
    );
}

export const UserAuth = () => {
    return useContext(AuthContext)
}
