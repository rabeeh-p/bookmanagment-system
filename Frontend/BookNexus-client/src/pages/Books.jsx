import { useState } from 'react';
import { dummyBooks } from '../data/dummyData';
// import toast from 'react-hot-toast';

const Books = () => {
  const [books, setBooks] = useState(dummyBooks);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    genre: '',
    publication_date: '',
    description: '',
  });

  const handleAddBook = (e) => {
    e.preventDefault();
    try {
      const newBookWithId = {
        ...newBook,
        id: books.length + 1,
      };
      setBooks([newBookWithId, ...books]);
      toast.success('Book added successfully!');
      setNewBook({
        title: '',
        author: '',
        genre: '',
        publication_date: '',
        description: '',
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen  text-white">
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
            />
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
          {books.map((book) => (
            <div key={book.id} className="bg-[#252525] p-4 rounded-lg border border-[#444444] shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-[#93C5FD]">{book.title}</h3>
              <p className="text-gray-300">by {book.author}</p>
              <p className="text-sm text-gray-400">Genre: {book.genre}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  

  );
};

export default Books;
