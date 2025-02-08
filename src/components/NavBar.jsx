import { useState , useEffect} from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const Navbar = () => {

const navigate = useNavigate();

  const { user, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    AOS.init({
      duration: 2000,  
      easing: 'ease-in-out',  
      once: true,  
    });
  }, []);

  return (
    <nav className="sticky z-50 top-0 flex items-center justify-between px-6 py-4 border-b-2 border-gray-700 backdrop-blur-md shadow-lg text-white relative"
    data-aos="fade-in">
      <button onClick={toggleSidebar} className="text-white">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <h1 className="text-lg font-bold ">Logo</h1>
      {user ? (
        <Link to="/login" className="text-white border-2 border-gray-700 py-2 px-4  rounded-2xl hover:rounded-3xl ">
          Login
        </Link>
      ) : (
        <button onClick={handleLogout} className="border-2 border-gray-700 py-2 px-4  rounded-2xl hover:rounded-3xl text-red-500">
          Logout
        </button>
      )}

      <div
        className={`fixed top-16 left-0 h-screen border-gray-700 bg-blur-lg  bg-opacity-10 inset-0 bg-black/80  p-4 shadow-lg w-screen  transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform ease-in-out duration-300 z-50`}
      >
        <ul className="flex flex-col space-y-4 px-6 mt-5 text-2xl">
          <li>
            <Link to="/" onClick={closeSidebar} className="block py-2">
              Home
            </Link>
          </li>
          <li>
            <Link to="/vyuha" onClick={closeSidebar} className="block py-2">
              Vyuha
            </Link>
          </li>
          <li>
            <Link to="/vega" onClick={closeSidebar} className="block py-2">
              Vega
            </Link>
          </li>
          <li>
            <Link to="/hackathon" onClick={closeSidebar} className="block py-2">
              Hackathon
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={closeSidebar} className="block py-2">
              Contact
            </Link>
          </li>
         
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
