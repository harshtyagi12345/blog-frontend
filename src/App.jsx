import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Service } from "./pages/Service";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";
import { Error } from "./pages/Error";
import { Footer } from "./components/Footer/Footer";
import { Logout } from "./pages/Logout";
import { Blogs }  from "./pages/Blogs";
import { CreateBlog } from './pages/CreateBlog';
import { AdminLayout } from "./components/layouts/Admin-layout";
import { AdminUsers } from "./pages/Admin-Users";
import { AdminContacts } from "./pages/Admin-Contacts";
import { AdminUpdate } from "./pages/Admin-update";


const App = () => {
  return (

    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Error/>} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/admin" element= {<AdminLayout />}>
        <Route path="Users" element = {<AdminUsers />} />
        <Route path="Contacts" element = {<AdminContacts />} />
        <Route path="/admin/users/:id" element={<AdminUpdate />} />
      </Route>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/create" element={<CreateBlog />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </>
  );

};

export default App;