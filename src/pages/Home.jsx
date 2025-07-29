import { Link } from "react-router-dom";
import { Analytics } from '../components/Analytics';
import '../index.css';

export const Home = () => {
  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <p>Write. Share. Inspire.</p>
              <h1>Welcome to Your Personal Blogging Hub</h1>
              <p>
                Discover powerful stories, share your thoughts, and connect with readers worldwide.
                Whether you're a passionate writer or a curious reader, our platform is made for you.
              </p>
             <div className="btn btn-group">
  <Link to="/create">
    <button className="btn">Start Writing</button>
  </Link>
  <Link to="/blogs">
    <button className="btn secondary-btn">Read Blogs</button>
  </Link>
</div>
            </div>

            {/* Hero Image */}
            <div className="hero-image">
              <img
                src="images/home.jpg"
                alt="woman writing blog"
                height="100"
              />
            </div>
          </div>
        </section>
      </main>

      <Analytics />

      {/* Featured Blogs Section */}
      <section className="section-hero">
        <div className="container grid grid-two-cols">
          {/* Image */}
          <div className="hero-image">
            <img
              src="images/home.jpg"
              alt="featured blog"
              width="400"
              height="500"
            />
          </div>

          {/* Content */}
          <div className="hero-content">
            <p>Explore Trending Topics</p>
            <h1>Featured Blogs</h1>
            <p>
              Dive into our most loved and trending blogs written by creators from all walks of life.
              Get insights, learn something new, or simply enjoy a good read. Inspiration awaits.
            </p>
           <div className="btn btn-group">
  <Link to="/blogs">
    <button className="btn">Explore Blogs</button>
  </Link>
  <Link to="/create">
    <button className="btn secondary-btn">Contribute Now</button>
  </Link>
</div>

          </div>
        </div>
      </section>
    </>
  );
};
