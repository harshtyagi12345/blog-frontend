import { Navigate, NavLink, Outlet } from "react-router-dom";
import { FaUser, FaRegListAlt, FaHome  } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useAuth } from "../../store/auth";



export  const AdminLayout = () => {
  const { user, isLoading } = useAuth();
  console.log("admin layout",user);

  if(isLoading){
    return <h1>loading ...</h1>
  }

  if(!user.isAdmin){
    return<Navigate to="/"/>;
  }
  
    return <>
    <header>
      <div className="container">
        <nav>
            <ul>
                <li> <NavLink to="/admin/users"> <FaUser />
                 Users </NavLink>
                </li>
                  <li> <NavLink to="/admin/contacts"><FaMessage />
                  Contacts </NavLink>
                </li>
                  <li> <NavLink to="/service"> <FaRegListAlt />
                  Services </NavLink>
                </li>
                  <li> <NavLink to="/"><FaHome />
                   Home </NavLink>
                </li>
            </ul>

        </nav>
      </div>
    </header>
    <Outlet/>
    </>
};