import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';

const URL = "https://blog-backend-59fp.onrender.com/api/auth/register";


export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();
  const {storeTokenInLs} = useAuth();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // handle form on submit
  const handleSubmit = async (e) => { 
    e.preventDefault();
    console.log(user);
    try {
     const response =  await fetch(URL , {
     method: "POST",
     headers:{
     "Content-Type": "application/json",
     },
     body:JSON.stringify(user), 
    });

    const res_data = await response.json();
    console.log("res from server",res_data);


  if(response.ok){
    
    storeTokenInLs(res_data.token);
    console.log("5");
    setUser({username :"",email: "",phone: "",password: ""});
    toast.success("Registration successful");
    navigate("/");
  }else {
  toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
    
  }
  } catch (error) {
      console.log("register",error);
    }
    };
  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                <img
                  src="images/png1.png"
                  alt="a nurse with a cute look"
                  width="500"
                  height="auto"
                />
              </div>
              {/* our main registration code  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">registration form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={user.username}
                      onChange={handleInput}
                      placeholder="Username"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="Enter your mail"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">phone</label>
                    <input
                      type="number"
                      name="phone"
                      value={user.phone}
                      onChange={handleInput}
                      placeholder="Enter your phone no."
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="Password"
                      required
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Register Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
