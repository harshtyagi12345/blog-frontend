 import { useEffect, useState } from "react"
 import { useAuth } from "../store/auth";
 import { Link } from "react-router-dom"

 export const AdminUsers = () => {
    const [users, setUser] =useState([]);

    const {authorizationToken} = useAuth();

   const getALLUserData= async () => {
    try {
        const response = await fetch ("https://blog-backend-59fp.onrender.com/api/admin/users", {
            method: "GET",
            headers:{
                Authorization: authorizationToken,
            },
        });
        const data = await response.json();
        console.log(`users ${data}`);   
        setUser(data); 
      } catch (error) {
       console.log(error);
    
    }
   };

   // delete user
   const deleteUser = async (id) => {
   try {
   const response = await fetch (`https://blog-backend-59fp.onrender.com/api/admin/users/delete/${id}`,
     {
            method: "DELETE",
            headers:{
                Authorization: authorizationToken,
            },
        });
        const data = await response.json();
        console.log(`users after delete: ${data}`);  

     if(response.ok){
      getALLUserData();
     }

        } catch (error) {
          console.log(error);      
     }
  };

    useEffect(() => {
     getALLUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
    <section className="admin-users-section">
      <div className="container">
        <h1>Admin Users Data </h1>
        </div>
     <div className="container admin-users">
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
             {users.map((curUser, index) => {
               return (
               <tr key={index}>
                <td>{curUser.username}</td>
                <td>{curUser.email}</td>
                <td>{curUser.phone}</td>
                <td><Link to={`/admin/users/${curUser._id}`}>Edit</Link>
                </td>
                <td> 
                <button
                 className="btn"
                 onClick={() => deleteUser(curUser._id)}>Delete</button>
                </td>
               </tr>
               );
              })}
            </tbody>
            </table>   
           </div>
        </section>
     );
};