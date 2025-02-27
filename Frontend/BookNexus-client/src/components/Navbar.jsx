import { Link } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
//   const { user } = useAuth();

  return (
    // <nav className="bg-secondary">
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
      <div className="w-full px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-white tracking-wide">BookManager</Link>
          
          <div className="flex space-x-4">
            <Link to="/books" className="text-white hover:text-accent">Books</Link>
            {/* {user ? (
              <>
                <Link to="/reading-lists" className="text-white hover:text-accent">Reading Lists</Link>
                <Link to="/profile" className="text-white hover:text-accent">Profile</Link>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-accent">Login</Link>
                <Link to="/register" className="text-white hover:text-accent">Register</Link>
              </>
            )} */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
