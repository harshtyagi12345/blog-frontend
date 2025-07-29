import React, { useState } from 'react';
import './BlogForm.css'; // Optional for styling

const BlogForm = () => {
  const [blogData, setBlogData] = useState({
    title: '',
    description: '',
    author: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setBlogData({
      ...blogData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://blog-backend-59fp.onrender.com/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(blogData)
      });

      if (res.ok) {
        setMessage('Blog posted successfully!');
        setBlogData({ title: '', description: '', author: '' });
      } else {
        setMessage('Failed to post blog.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Error posting blog.');
    }
  };

  return (
    <form className="blog-form" onSubmit={handleSubmit}>
      <h2>Create a New Blog</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={blogData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={blogData.description}
        onChange={handleChange}
        required
      ></textarea>
      <input
        type="text"
        name="author"
        placeholder="Author"
        value={blogData.author}
        onChange={handleChange}
        required
      />
      <button type="submit">Post Blog</button>
      {message && <p className="message">{message}</p>}
    </form>
  );
};

export default BlogForm;
