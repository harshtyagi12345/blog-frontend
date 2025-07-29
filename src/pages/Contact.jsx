import { useState } from "react";
import { useAuth } from "../store/auth";
import '../index.css';

const defaultContactFormdata = {
   username:"",
    email:"",
    message:"",
};

export const Contact = () => {

  const[contact, setContact] = useState(defaultContactFormdata);
  

  const [userData , setUserData] = useState(true);
  const { user } = useAuth();


  if(userData && user){
    setContact({
    username: user.username,
    email: user.email,
    message:"",
  });

  setUserData(false);
};

const handleInput = (e) => {
  const name = e.target.name;
  const value = e.target.value;

  setContact({
    ...contact,
    [name]: value,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("https://blog-backend-59fp.onrender.com/api/form/contact", {
      method:"POST",
      headers:{
      'Content-type':"application/json"  
      },

      body:JSON.stringify(contact),

    });

  if(response.ok){
    setContact(defaultContactFormdata);
    const data = await response.json();
    console.log(data);
    alert("Message send successfully");
  }

  } catch (error) {
    alert("Message not send ");
    console.log(error);

  }


};

  return (
  <>

    <section className="section-contact">
      <div className="contact-content container">
       <h1 className="main-heading"> Contact Us </h1>
      </div>

      <div className="container grid grid-two-cols">
        <div className="contact-image">
          <img src="images/contact.png" alt="we are always ready to help" width="400" height="auto"/>
        </div>

       <section className="section-form">
         <form onSubmit={ handleSubmit}>
          <div>
           <label htmlFor="username"> username </label>
           <input type="text" 
           name="username" 
           id="username" 
           autoComplete="off"
           value={contact.username}
           onChange={handleInput}
           required />
            </div>

          <div>
           <label htmlFor="email"> email </label>
           <input type="email"
           name="email" 
           id="email" 
           autoComplete="off"
           value={contact.email}
           onChange={handleInput}
           required
            />
            </div>

            <div>
              <label htmlFor="message">message</label>
             <textarea 
             name="message" 
             id="message" 
             autoComplete="off"
             value={contact.message}
             onChange={handleInput}
             required
             cols="30" 
             rows="7"
             ></textarea>
              </div>

              <div>
                <button type="submit">submit</button>
          </div> 
         </form>
       </section>
      </div>
      <section className="mb-3">
      <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.980154297284!2d77.69052587484033!3d12.908996987400668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae139954612c25%3A0x4f1bad653682f66c!2sZolo%20Belair%20A%20%26%20B%20-%20Best%20PG%20in%20Sarjapur%20%7C%20Near%20Wipro!5e0!3m2!1sen!2sin!4v1752578304877!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
      </section>
    </section>
  </>
  );
};