import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    
    const navigate = useNavigate('')


    return (
        <div className="text-center text-white flex flex-col justify-center items-center p-6">
        <h1 className="text-5xl font-bold mb-6 text-[#3B82F6]">Welcome to BookManager</h1>
        <p className="text-xl text-gray-400 mb-8">
          Your personal book management system
        </p>
      
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
          {/* Manage Books Section */}
          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
            <h2 className="text-2xl font-semibold mb-4 text-[#93C5FD]">Manage Books</h2>
            <p className="text-gray-400 mb-4">
              Create and manage your book collection with ease.
            </p>
            <h6
            onClick={()=>navigate('/books')}
              className="bg-[#3B82F6] text-white px-4 py-2 rounded-lg font-bold inline-block hover:bg-[#2563EB] transition"
            >
              View Books →
            </h6>
          </div>
      
          {/* Reading Lists Section */}
          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
            <h2 className="text-2xl font-semibold mb-4 text-[#93C5FD]">Reading Lists</h2>
            <p className="text-gray-400 mb-4">
              Organize your books into custom reading lists.
            </p>
            <h6
            onClick={()=>navigate('/readingList')}
              
              className="bg-[#3B82F6] text-white px-4 py-2 rounded-lg font-bold inline-block hover:bg-[#2563EB] transition"
            >
              Reading List →
            </h6>
            
          </div>
        </div>
      </div>
      
    );
}

export default Home;