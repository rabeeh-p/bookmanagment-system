import { useNavigate } from 'react-router-dom';
import { Menu, X } from "lucide-react";
import { useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  
  const token = localStorage.getItem('access_token');
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');  
    navigate('/login');  
  };

  const navigateTo = (path) => {
    navigate(path);  
  };

  return (
    
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
    <div className="w-full px-4">
      <div className="flex justify-between items-center h-16">
        {/* Logo */}
        <button
          onClick={() => navigateTo("/")}
          className="text-2xl font-bold text-white tracking-wide"
        >
          BookManager
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white md:hidden"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-4">
          <button
            onClick={() => navigateTo("/user-books")}
            className="text-white hover:text-gray-200"
          >
            My Books
          </button>
          {token ? (
            <>
              <button
                onClick={() => navigateTo("/profile")}
                className="text-white hover:text-gray-200"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigateTo("/login")}
                className="text-white hover:text-gray-200"
              >
                Login
              </button>
              <button
                onClick={() => navigateTo("/register")}
                className="text-white hover:text-gray-200"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-2 p-4 ">
          <button
            onClick={() => navigateTo("/user-books")}
            className="text-white hover:text-gray-200"
          >
            My Books
          </button>
          {token ? (
            <>
              <button
                onClick={() => navigateTo("/profile")}
                className="text-white hover:text-gray-200"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigateTo("/login")}
                className="text-white hover:text-gray-200"
              >
                Login
              </button>
              <button
                onClick={() => navigateTo("/register")}
                className="text-white hover:text-gray-200"
              >
                Register
              </button>
            </>
          )}
        </div>
      )}
    </div>
  </nav>
  );
};

export default Navbar;
