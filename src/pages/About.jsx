import { NavLink } from "react-router-dom";
import { Analytics } from "../components/Analytics";
import { useAuth } from "../store/auth";

export const About = () => {
  const { user } = useAuth();

  return (
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <p>
                Welcome{user ? `, ${user.username}` : ""} to our blogging platform!
              </p>

              <h1>Why Blog With Us?</h1>

              <p>
                ✍️ <strong>Empower Your Voice:</strong> Whether you're a seasoned writer or just starting out, our platform gives you the space to express your ideas freely.
              </p>
              <p>
                🌐 <strong>Build Your Audience:</strong> Share your stories and connect with a vibrant community of readers and bloggers from around the world.
              </p>
              <p>
                🎨 <strong>Customizable Profiles:</strong> Make your blog your own with rich formatting and beautiful layouts.
              </p>
              <p>
                📈 <strong>Track Your Growth:</strong> Get real-time analytics and feedback on how your posts are performing.
              </p>
              <p>
                🤝 <strong>Community Support:</strong> Participate in discussions, collaborate on content, and grow together.
              </p>

              <div className="btn btn-group">
                <NavLink to="/contact">
                  <button className="btn">Join the Community</button>
                </NavLink>
                <NavLink to="/blogs">
                  <button className="btn secondary-btn">Explore Blogs</button>
                </NavLink>
              </div>
            </div>

            <div className="hero-image">
              <img
                src="images/about.png"
                alt="blogging community"
                width="400"
                height="500"
              />
            </div>
          </div>
        </section>
      </main>

      <Analytics />
    </>
  );
};
