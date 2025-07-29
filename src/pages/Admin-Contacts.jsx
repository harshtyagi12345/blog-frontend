 import { useEffect, useState } from "react"
 import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
 
 
 export const AdminContacts = () => {
const [contactData, setcontactData] = useState([]);
const { authorizationToken } = useAuth();
const getContactsData=  async () => {
    try {
        const response =await fetch("https://blog-backend-59fp.onrender.com/api/admin/contacts" ,{
          method:"GET",
          headers:{
            Authorization:authorizationToken,

          },
        });
        const data = await response.json()
        console.log("contact data", data);
        if(response.ok){
            setcontactData(data);
        }
    } catch (error) {
      console.log(error);  
    }
};

//deleteContact the funcation
const deleteContactById =  async (id) => {
    try {
        console.log("deleting...");
        const response =await fetch(`https://blog-backend-59fp.onrender.com/api/admin/contacts/delete/${id}`,
            {
                method:"Delete",
                headers: {
                    Authorization: authorizationToken,
                },
            }
        );
        if(response.ok){
            getContactsData();
            toast.success("Deleted successfully");
        }else{
            toast.error("Not Deleted");
        }

        }catch (error) {
      console.log(error);  
    }
};



 useEffect(() => {
    getContactsData();
}, [] );


    return (
        <>

        <section className="admin-contact-section"> 
         <h1>Admin Contact Data</h1>

         <div className="container contact-users">
            {contactData.map((curContactData, index) => {

                const {username, email, message, _id } = curContactData;

              return(
                    <div key ={index}>    
                    <p>{username}</p>
                    <p>{email}</p>
                    <p>{message}</p>
              <button className="btn" onClick={() => deleteContactById(_id)}>delete</button>
              </div>
              );
            })};
            </div>
            </section>
        </>
    );    
};