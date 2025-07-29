import { useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import './CreateBlog.css';

export const CreateBlog = () => {
  const navigate = useNavigate();

  const [blog, setBlog] = useState({
    price: "",
    description: "",
    service: ""
  });

  const [providerImage, setProviderImage] = useState(null); // for file

  const handleInput = (e) => {
    const { name, value } = e.target;
    setBlog({
      ...blog,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setProviderImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!providerImage) {
      toast.error("Provider image is required");
      return;
    }

    const formData = new FormData();
    formData.append("provider", providerImage);
    formData.append("price", blog.price);
    formData.append("description", blog.description);
    formData.append("service", blog.service);

    try {
      const response = await fetch("https://blog-backend-59fp.onrender.com/api/blogging/blogs", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Blog created successfully!");
        setBlog({ price: "", description: "", service: "" });
        setProviderImage(null);
        navigate("/");
      } else {
        toast.error(data.message || "Something went wrong");
      }

    } catch (error) {
      console.error("Error:", error);
      toast.error("Network or server error");
    }
  };

  return (
    <section>
      <main>
        <div className="section-registration">
        <div className="container grid grid-two-cols">
            <div className="registration-form">
          <h1>Create Blog</h1>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
              <label>Provider Image</label>
              <input
                type="file"
                name="provider"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </div>
            <div>
              <label>Blog Title</label>
              <input
                type="text"
                name="service"
                value={blog.service}
                onChange={handleInput}
                required
              />
            </div>
            <div>
              <label>Description</label>
              <textarea
                name="description"
                value={blog.description}
                onChange={handleInput}
                required
              ></textarea>
            </div>
            <div>
              <label>Price</label>
              <input
                type="text"
                name="price"
                value={blog.price}
                onChange={handleInput}
                required
              />
            </div>
            <br />
            <button type="submit">Submit Blog</button>
          </form>
          </div>
        </div>
        </div>
      </main>
    </section>
  );
};
