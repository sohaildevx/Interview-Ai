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
            if (data?.user) {
                setUser(data.user);
                return { ok: true, user: data.user };
            }
            return { ok: false, message: data?.message || "Login failed" };
        } catch (error) {
            console.log(error?.response?.data?.message || error);
            return { ok: false, message: error?.response?.data?.message || "Login failed" };
        } finally {
            setLoading(false);
        }
    }

    const handleRegister = async({username, email, password})=>{
        setLoading(true);
        try {
            const data = await registerUser({username, email, password});
            if (data?.user) {
                setUser(data.user);
                return { ok: true, user: data.user };
            }
            return { ok: false, message: data?.message || "Registration failed" };
        } catch (error) {
            console.log(error?.response?.data?.message || error);
            return { ok: false, message: error?.response?.data?.message || "Registration failed" };
        } finally {
            setLoading(false);
        }
    }

    const handleLogOut = async()=>{
        setLoading(true);
        try {
            await logOutUser();
            setUser(null);
            return { ok: true };
        } catch (error) {
            console.log(error?.response?.data?.message || error);
            return { ok: false, message: error?.response?.data?.message || "Logout failed" };
        } finally {
            setLoading(false);
        }
    }

    return {
        user,
        loading,
        handleLogin,
        handleRegister,
        handleLogOut
    }
}