import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  
  // Check if access token exists in localStorage
  const token = localStorage.getItem('access_token');

  // Logout function to remove token and redirect to login page
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token'); // Optional if you want to clear refresh token too
    navigate('/login'); // Redirect to login page after logout
  };

  const navigateTo = (path) => {
    navigate(path); // Function to handle navigation
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
      <div className="w-full px-4">
        <div className="flex justify-between items-center h-16">
          <button 
            onClick={() => navigateTo('/')} 
            className="text-2xl font-bold text-white tracking-wide"
          >
            BookManager
          </button>

          <div className="flex space-x-4">
            <button 
              onClick={() => navigateTo('/books')} 
              className="text-white hover:text-accent"
            >
              Books
            </button>
            {token ? (
              <>
                <button 
                  onClick={() => navigateTo('/reading-list')} 
                  className="text-white hover:text-accent"
                >
                  Reading Lists
                </button>
                <button 
                  onClick={() => navigateTo('/profile')} 
                  className="text-white hover:text-accent"
                >
                  Profile
                </button>
                <button 
                  onClick={handleLogout} 
                  className="text-white hover:text-accent"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => navigateTo('/login')} 
                  className="text-white hover:text-accent"
                >
                  Login
                </button>
                <button 
                  onClick={() => navigateTo('/register')} 
                  className="text-white hover:text-accent"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
