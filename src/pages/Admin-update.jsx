import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";

export const AdminUpdate = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();
  const { id } = useParams(); // Get user id from the URL
  const { authorizationToken } = useAuth();

  const fetchUserDetails = async () => {
    try {
      const res = await fetch(`https://blog-backend-59fp.onrender.com/api/admin/users/${id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await res.json();

      if (res.ok) {
        setUser({
          username: data.username,
          email: data.email,
          phone: data.phone,
        });
      } else {
        toast.error(data.message || "Failed to fetch user details");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchUserDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(id);
      const res = await fetch(`https://blog-backend-59fp.onrender.com/api/admin/users/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("User updated successfully!");
        navigate("/admin/users"); // Navigate to user list or wherever you want
      } else {
        toast.error(data.message || "Failed to update user");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <section>
      <main>
        <div className="section-registration">
          <div className="container grid grid-two-cols">

            <div className="registration-form">
              <h1 className="main-heading mb-3">Update User</h1>
              <br />
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleInput}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInput}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="number"
                    name="phone"
                    value={user.phone}
                    onChange={handleInput}
                    required
                  />
                </div>
                <br />
                <button type="submit" className="btn btn-submit">
                  Update User
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};
