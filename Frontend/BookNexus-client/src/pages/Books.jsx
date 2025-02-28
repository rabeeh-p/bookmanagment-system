import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";

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
  

  

useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('access_token'); 

        if (token) {
          const response = await axios.get('http://localhost:8000/books/', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setBooks(response.data); 
        } else {
          console.log('No token found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
}, []);

 

//   const handleAddBook = async (e) => {
//     e.preventDefault();

//     if (!newBook || typeof newBook !== 'object') {
//         Swal.fire({
//             icon: 'error',
//             title: 'Validation Error',
//             text: 'Invalid form data. Please try again.',
//             confirmButtonColor: '#FFD700'
//         });
//         return;
//     }

//     const { title = '', authors = '', genre = '', publication_date = '', description = '' } = newBook;

//     if (!title.trim() || !authors.trim() || !genre.trim() || !publication_date.trim() || !description.trim()) {
//         Swal.fire({
//             icon: 'error',
//             title: 'Validation Error',
//             text: 'All fields are required!',
//             confirmButtonColor: '#FFD700'
//         });
//         return;
//     }

//     try {
//         const token = localStorage.getItem('access_token');

//         if (!token) {
//             Swal.fire({
//                 icon: 'warning',
//                 title: 'Unauthorized',
//                 text: 'No token found, please log in.',
//                 confirmButtonColor: '#FFD700'
//             });
//             return;
//         }

//         const response = await axios.post('http://localhost:8000/books/', newBook, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`,
//             },
//         });

//         setBooks([response.data, ...books]);

//         Swal.fire({
//             icon: 'success',
//             title: 'Book Added!',
//             text: 'Your book has been added successfully.',
//             confirmButtonColor: '#FFD700'
//         });

//         setNewBook({
//             title: '',
//             author: '',
//             genre: '',
//             publication_date: '',
//             description: '',
//         });

//     } catch (error) {
//         console.error('Error adding book:', error);

//         Swal.fire({
//             icon: 'error',
//             title: 'Error',
//             text: 'Failed to add book. Please try again later.',
//             confirmButtonColor: '#FFD700'
//         });
//     }
// };

const handleAddBook = async (e) => {
  e.preventDefault();

  if (!newBook || typeof newBook !== 'object') {
      Swal.fire({
          icon: 'error',
          title: 'Validation Error',
          text: 'Invalid form data. Please try again.',
          confirmButtonColor: '#FFD700'
      });
      return;
  }

  const { title = '', authors = '', genre = '', publication_date = '', description = '' } = newBook;

  if (!title.trim() || !authors.trim() || !genre.trim() || !publication_date.trim() || !description.trim()) {
      Swal.fire({
          icon: 'error',
          title: 'Validation Error',
          text: 'All fields are required!',
          confirmButtonColor: '#FFD700'
      });
      return;
  }

  // Convert input date to a valid Date object
  const selectedDate = new Date(publication_date);
  const today = new Date();

  // Ensure the selected date is not in the future
  if (selectedDate > today) {
      Swal.fire({
          icon: 'error',
          title: 'Validation Error',
          text: 'Publication date cannot be in the future!',
          confirmButtonColor: '#FFD700'
      });
      return;
  }

  try {
      const token = localStorage.getItem('access_token');

      if (!token) {
          Swal.fire({
              icon: 'warning',
              title: 'Unauthorized',
              text: 'No token found, please log in.',
              confirmButtonColor: '#FFD700'
          });
          return;
      }

      const response = await axios.post('http://localhost:8000/books/', newBook, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
      });

      setBooks([response.data, ...books]);

      Swal.fire({
          icon: 'success',
          title: 'Book Added!',
          text: 'Your book has been added successfully.',
          confirmButtonColor: '#FFD700'
      });

      setNewBook({
          title: '',
          authors: '',
          genre: '',
          publication_date: '',
          description: '',
      });

  } catch (error) {
      console.error('Error adding book:', error);

      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to add book. Please try again later.',
          confirmButtonColor: '#FFD700'
      });
  }
};


  return (
    <div className="container mx-auto px-4 py-8 min-h-screen text-white">
      <div className="grid md:grid-cols-2 gap-8">
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
