import {useAuth} from "../hooks/useAuth";
import {Navigate} from "react-router-dom";

export const Protected = ({children}) => {
    const {loading, user} = useAuth();

    if(loading) {
        return <div className="loader">Loading...</div>
    }

    if(!user){
        return <Navigate to="/login" replace />;
    }

    return children;
}