import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiEdit, FiTrash } from 'react-icons/fi';
import Swal from 'sweetalert2';

const UserBooks = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [newBookData, setNewBookData] = useState({ title: '', authors: '', genre: '', publication_date: '', description: '' });
  
  useEffect(() => {
    const fetchUserBooks = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (token) {
          const response = await axios.get('http://localhost:8000/user/books/', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setBooks(response.data);
        }
      } catch (error) {
        console.error('Error fetching user books:', error);
      }
    };
    fetchUserBooks();
  }, []);

  const handleEditClick = (book) => {
    setEditingBook(book);
    setNewBookData(book);
  };

  const handleUpdateBook = async () => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.put(`http://localhost:8000/user/books/${editingBook.id}/`, newBookData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setBooks(books.map((book) => (book.id === editingBook.id ? newBookData : book)));
      setEditingBook(null);
      Swal.fire({ icon: 'success', title: 'Updated!', text: 'Book updated successfully.', confirmButtonColor: '#FFD700' });
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error!', text: 'Failed to update book.', confirmButtonColor: '#FFD700' });
    }
  };

  const handleDeleteBook = async (bookId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FFD700',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem('access_token');
          await axios.delete(`http://localhost:8000/user/books/${bookId}/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setBooks(books.filter((book) => book.id !== bookId));
        //   Swal.fire('Deleted!', 'Your book has been deleted.', 'success',confirmButtonColor: '#FFD700');
        Swal.fire({
            title: 'Deleted!',
            text: 'Your book has been deleted.',
            icon: 'success',
            confirmButtonColor: '#FFD700'
          });
          
        } catch (error) {
        //   Swal.fire('Error!', 'Failed to delete book.', 'error');
        Swal.fire({
            title: 'Error!',
            text: 'Failed to delete book.',
            icon: 'error',
            confirmButtonColor: '#FFD700' // Yellow color
          });
          
        }
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-[#3B82F6]">Your Books</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.id} className="bg-[#252525] p-4 rounded-lg border border-[#444444] shadow-md hover:shadow-lg transition relative">
            <h3 className="text-xl font-semibold text-[#93C5FD]">{book.title}</h3>
            <p className="text-gray-300">by {book.authors}</p>
            <p className="text-sm text-gray-400">Genre: {book.genre}</p>
            <p className="text-sm text-gray-400">Published on: {book.publication_date}</p>
            <p className="text-sm text-gray-400">Description: {book.description}</p>
            <div className="flex justify-end mt-3 space-x-3">
              <FiEdit className="text-yellow-500 cursor-pointer" onClick={() => handleEditClick(book)} />
              <FiTrash className="text-red-500 cursor-pointer" onClick={() => handleDeleteBook(book.id)} />
            </div>
          </div>
        ))}
      </div>
      {editingBook && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg w-96">
      <h3 className="text-xl font-bold mb-4 text-gray-900">Edit Book</h3>
      <input className="border p-2 w-full mb-2 text-gray-900" value={newBookData.title} onChange={(e) => setNewBookData({ ...newBookData, title: e.target.value })} />
      <input className="border p-2 w-full mb-2 text-gray-900" value={newBookData.authors} onChange={(e) => setNewBookData({ ...newBookData, author: e.target.value })} />
      <input className="border p-2 w-full mb-2 text-gray-900" value={newBookData.genre} onChange={(e) => setNewBookData({ ...newBookData, genre: e.target.value })} />
      <input className="border p-2 w-full mb-2 text-gray-900" value={newBookData.publication_date} onChange={(e) => setNewBookData({ ...newBookData, publication_date: e.target.value })} />
      <textarea className="border p-2 w-full mb-2 text-gray-900" value={newBookData.description} onChange={(e) => setNewBookData({ ...newBookData, description: e.target.value })}></textarea>
      <div className="flex justify-end space-x-2">
        <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setEditingBook(null)}>Cancel</button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={handleUpdateBook}>Save</button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default UserBooks;
