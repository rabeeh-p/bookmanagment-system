import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { handleLogout } from "../utils/authUtil"; 
import { useNavigate } from 'react-router-dom';
const BooksGallery = () => {
  const navigate= useNavigate()
  const [books, setBooks] = useState([]);

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
        if (error.response && error.response.status === 401) {
          console.error('Unauthorized access - logging out');
          handleLogout(navigate);   
      } else {
          console.error('Error fetching books:', error);
      }
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-[#3B82F6]">All Books Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.id} className="bg-[#252525] p-4 rounded-lg border border-[#444444] shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-[#93C5FD]">{book.title}</h3>
            <p className="text-gray-300">by {book.authors}</p>
            <p className="text-sm text-gray-400">Genre: {book.genre}</p>
            <p className="text-sm text-gray-400">Published on: {book.publication_date}</p>
            <p className="text-sm text-gray-400">Description: {book.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksGallery;
