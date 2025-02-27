import { useState, useEffect } from 'react';
import axios from 'axios';  

const ReadingLists = () => {
    const [readingLists, setReadingLists] = useState([]);  
    const [books, setBooks] = useState([]);  
    const [unread, setUnread] = useState([]);  
    const [newList, setNewList] = useState({ name: '' });

    const token = localStorage.getItem('access_token');  
    console.log(unread,'unread');
    

    useEffect(() => {
        const fetchReadingLists = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/reading-list/', {
                    headers: {
                        Authorization: `Bearer ${token}`,  
                    },
                });
                console.log(response.data, 'data listt');

                if (Array.isArray(response.data.reading_lists)) {
                    setReadingLists(response.data.reading_lists);
                    setUnread(response.data.unread_books);
                } else {
                    console.error('Invalid data format for reading lists.');
                }
            } catch (error) {
                console.error('Error fetching reading lists.', error);
            }
        };

        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/books/', {
                    headers: {
                        Authorization: `Bearer ${token}`,  
                    },
                });
                if (Array.isArray(response.data)) {
                    setBooks(response.data);
                } else {
                    console.error('Invalid data format for books.');
                }
            } catch (error) {
                console.error('Error fetching books.', error);
            }
        };

        fetchReadingLists();
        fetchBooks();  
    }, [token]);  

    const handleCreateList = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                '/api/reading-list/',
                { name: newList.name },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,  
                    },
                }
            );
            if (response.data) {
                setReadingLists([...readingLists, response.data]);
                setNewList({ name: '' });
            } else {
                console.error('Error creating reading list.');
            }
        } catch (error) {
            console.error('Error creating reading list.', error);
        }
    };

    const handleAddBookToList = async (listId, bookId) => {
        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/reading-list/${listId}/add-book/`,
                { book_id: bookId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,  
                    },
                }
            );
            const updatedLists = readingLists.map((list) =>
                list.id === listId
                    ? { ...list, reading_list_books: [...list.reading_list_books, response.data] }
                    : list
            );
            setReadingLists(updatedLists);
        } catch (error) {
            console.error('Error adding book to list.', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen text-white">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Create Reading List Section */}
                <div className="bg-[#1A1A1A] p-6 rounded-2xl shadow-lg border border-[#333333]">
                    <h2 className="text-2xl font-bold mb-6 text-[#3B82F6]">Create Reading List</h2>
                    <form onSubmit={handleCreateList} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">List Name</label>
                            <input
                                type="text"
                                value={newList.name}
                                onChange={(e) => setNewList({ name: e.target.value })}
                                className="input w-full bg-[#252525] border border-gray-600 text-white rounded-lg p-2 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold py-2 rounded-lg transition"
                        >
                            Create List
                        </button>
                    </form>
                </div>

                {/* Your Reading Lists Section */}
                <div className="bg-[#1A1A1A] p-6 rounded-2xl shadow-lg border border-[#333333]">
                    <h2 className="text-2xl font-bold mb-6 text-[#3B82F6]">Your Reading Lists</h2>
                    <div className="space-y-6">
                        {readingLists.length === 0 ? (
                            <p className="text-gray-500">No reading lists available.</p>
                        ) : (
                            readingLists.map((list) => (
                                <div
                                    key={list.id}
                                    className="bg-[#252525] p-4 rounded-lg border border-[#444444] shadow-md hover:shadow-lg transition"
                                >
                                    <h3 className="text-xl font-semibold text-[#93C5FD] mb-4">{list.name}</h3>
                                    <div className="space-y-2">
                                        {list.books && list.books.length === 0 ? (
                                            <p className="text-gray-400">No books added to this list.</p>
                                        ) : (
                                            list.books?.map((item) => (
                                                <div key={item.id} className="text-gray-300">
                                                    {item.title} by {item.authors}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    <div className="mt-4">
                                        <select
                                            className="input w-full bg-[#252525] border border-gray-600 text-white rounded-lg p-2 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition"
                                            onChange={(e) => handleAddBookToList(list.id, e.target.value)}
                                            defaultValue=""
                                        >
                                            <option value="" disabled>
                                                Add a book to this list
                                            </option>
                                            {unread
                                                .filter((book) => !book.is_read) // Filter to show only unread books
                                                .map((book) => (
                                                    <option key={book.id} value={book.id} className="text-black">
                                                        {book.title} by {book.authors}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReadingLists;
