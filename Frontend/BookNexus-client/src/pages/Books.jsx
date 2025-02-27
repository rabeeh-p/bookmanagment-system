import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import toast from 'react-hot-toast';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: '',
    authors: '',
    genre: '',
    publication_date: '',
    description: '',
  });
  console.log(books,'books');
  

  // Fetch books from the backend API
//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/books/');
//         setBooks(response.data);
//       } catch (error) {
//         console.error('Error fetching books:', error);
//         // toast.error('Failed to fetch books');
//       }
//     };

//     fetchBooks();
//   }, []);

useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('access_token'); // Get the stored access token

        if (token) {
          // Pass the token in the Authorization header for authentication
          const response = await axios.get('http://localhost:8000/books/', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setBooks(response.data); // Set the fetched books data to state
        } else {
          console.log('No token found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching books:', error);
        // toast.error('Failed to fetch books');
      }
    };
    fetchBooks();
}, []);

  // Handle adding a new book
  const handleAddBook = async (e) => {
    e.preventDefault();

    try {
        const token = localStorage.getItem('access_token'); // Retrieve the JWT token from localStorage

        if (!token) {
          console.error('No token found, please log in.');
          // Optionally show a message or redirect the user to login
          return;
        }
      const response = await axios.post('http://localhost:8000/books/', newBook, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      setBooks([response.data, ...books]);
      // toast.success('Book added successfully!');
      setNewBook({
        title: '',
        author: '',
        genre: '',
        publication_date: '',
        description: '',
      });
    } catch (error) {
      console.error('Error adding book:', error);
      // toast.error('Failed to add book');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen text-white">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Add Book Section */}
        <div className="bg-[#1A1A1A] p-6 rounded-2xl shadow-lg border border-[#333333]">
          <h2 className="text-2xl font-bold mb-6 text-[#3B82F6]">Add New Book</h2>
          <form onSubmit={handleAddBook} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
              <input
                type="text"
                className="input w-full bg-[#252525] border border-gray-600 text-white rounded-lg p-2 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition"
                required
                value={newBook.title}
                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Author</label>
              <input
                type="text"
                className="input w-full bg-[#252525] border border-gray-600 text-white rounded-lg p-2 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition"
                required
                value={newBook.authors}
                onChange={(e) => setNewBook({ ...newBook, authors: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Genre</label>
              <input
                type="text"
                className="input w-full bg-[#252525] border border-gray-600 text-white rounded-lg p-2 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition"
                required
                value={newBook.genre}
                onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Publication Date</label>
              <input
                type="date"
                className="input w-full bg-[#252525] border border-gray-600 text-white rounded-lg p-2 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition"
                required
                value={newBook.publication_date}
                onChange={(e) => setNewBook({ ...newBook, publication_date: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
              <textarea
                className="input w-full bg-[#252525] border border-gray-600 text-white rounded-lg p-2 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition"
                value={newBook.description}
                onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
              ></textarea>
            </div>
            <button type="submit" className="btn w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold py-2 rounded-lg transition">
              Add Book
            </button>
          </form>
        </div>

        {/* Book List Section */}
        <div className="bg-[#1A1A1A] p-6 rounded-2xl shadow-lg border border-[#333333]">
          <h2 className="text-2xl font-bold mb-6 text-[#3B82F6]">Book List</h2>
          <div className="space-y-4">
          {books.slice(0, 2).map((book) => (
            <div key={book.id} className="bg-[#252525] p-4 rounded-lg border border-[#444444] shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-[#93C5FD]">{book.title}</h3>
              <p className="text-gray-300">by {book.authors}</p>
              <p className="text-sm text-gray-400">Genre: {book.genre}</p>
              <p className="text-sm text-gray-400">Published on: {book.publication_date}</p>
              <p className="text-sm text-gray-400">Description: {book.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            to="/gallery"
            className="btn bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            View More
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
