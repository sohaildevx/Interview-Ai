import { useContext } from "react";
import { AuthContext } from "../auth.context";
import {
    loginUser,
    registerUser,
    logOutUser,
} from "../services/auth.api";

export const useAuth = ()=>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }

    const {user, setUser, loading, setLoading} = context;

    const handleLogin = async ({email, password})=>{
        setLoading(true);
        
        try {
            const data = await loginUser({email, password});
            setUser(data.user);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const handleRegister = async({username, email, password})=>{
        setLoading(true);
        try {
            const data = await registerUser({username, email, password});
            setUser(data.user);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const handleLogOut = async()=>{
        setLoading(true);
        try {
            const data = await logOutUser();
            setUser(null);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    return {
        handleLogin,
        handleRegister,
        handleLogOut
    }
}