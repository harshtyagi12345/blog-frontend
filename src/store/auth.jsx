/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Children, createContext } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

const [token, setToken ] = useState(localStorage.getItem("token"));
const [user, setUser] = useState("");
const [isLoading, setIsLoading] = useState(true);
const [services, setServices] = useState("");
const authorizationToken =`Bearer ${token}`;

 const storeTokenInLs = (serverToken) => {
    setToken(serverToken);  
    return localStorage.setItem("token", serverToken);
   };

   let isLoggedIn = !!token;
   console.log("isLoggedIn", isLoggedIn);

   // logout function
   const LogoutUser = ( ) => {
     setToken("");
     return localStorage.removeItem("token");
   };
// jwt authentication 

const userAuthentication = async () => {
    try {
        setIsLoading(true);
        const response =await fetch("https://blog-backend-59fp.onrender.com/api/auth/user",{
        method:"GET",
        headers:{
        Authorization:authorizationToken,
        },
        });
   
        if(response.ok){
            const data = await response.json();
            console.log("user data", data.userData);
            setUser(data.userData);
            setIsLoading(false);
        }else{
         console.error("Error fetching user data");
         setIsLoading(false);
        }

    } catch (error) {
      console.error("Error fetching user data", error);
    }
};

//fetch service
const getServiceData = async () => {
try {
    const response = await fetch("https://blog-backend-59fp.onrender.com/api/data/service", {
    method: "GET",
    });

   if (response.ok) {
    const service = await response. json();
    console.log(service.data);
    setServices(service.data);
}

} catch (error) {
  console.log(`services frontend error : ${error}`);
} 
};



useEffect(() => {
    getServiceData();
    userAuthentication();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

    return(
    <AuthContext.Provider value={{isLoggedIn, storeTokenInLs, LogoutUser, user, services, authorizationToken, isLoading }}>
        {children}
    </AuthContext.Provider>
 );
};

export const useAuth = ( ) => {
    const authContextValue = useContext(AuthContext);
    if(!authContextValue){
        throw new Error(" useAuth used outside of the Provider");
    }
    return authContextValue;
}