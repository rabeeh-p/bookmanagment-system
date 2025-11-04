import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import Swal from "sweetalert2";
import { handleLogout } from "../utils/authUtil"; 
import { useNavigate } from 'react-router-dom';

const ReadingLists = () => {
    const navigate= useNavigate()
    const [readingLists, setReadingLists] = useState([]);
    const [unreadBooks, setUnreadBooks] = useState([]);
    const [newList, setNewList] = useState('');

    const token = localStorage.getItem('access_token');

    useEffect(() => {
        const fetchReadingLists = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/reading-list/', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setReadingLists(response.data.reading_lists);
                setUnreadBooks(response.data.unread_books);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.error('Unauthorized access - logging out');
                    handleLogout(navigate);   
                } else {
                    console.error('Error fetching books:', error);
                }
                
            }
        };
        fetchReadingLists();
    }, [token, navigate,]);



    const handleCreateList = async (e) => {
        e.preventDefault();

        const trimmedName = newList.trim();

        const letterCount = (trimmedName.match(/[a-zA-Z]/g) || []).length;

        if (!trimmedName || letterCount < 3) {
            Swal.fire({
                icon: "error",
                title: "Invalid Name",
                text: "Reading list name must contain at least 3 letters!",
                confirmButtonColor: "#FFD700",
            });
            return;
        }

        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/reading-list/',
                { name: trimmedName },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setReadingLists([response.data, ...readingLists]);
            setNewList('');
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Reading list created successfully!",
                confirmButtonColor: "#FFD700",
            });
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Unauthorized access - logging out');
                handleLogout(navigate);   
            } else {
                console.error('Error fetching books:', error);
           
            console.error("Error creating reading list.", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to create reading list. Try again!",
                confirmButtonColor: "#FFD700",
            });
        }
        }
    };



    const handleRemoveReadingList = async (listId) => {
        const confirmDelete = await Swal.fire({
            title: "Are you sure?",
            text: "This will permanently delete the reading list!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (confirmDelete.isConfirmed) {
            try {
                const response = await axios.delete('http://127.0.0.1:8000/api/reading-list/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                    data: { reading_list_id: listId },
                });

                if (response.status === 204) {
                    await Swal.fire({
                        title: "Deleted!",
                        text: "Your reading list has been removed.",
                        icon: "success",
                        confirmButtonColor: "#FFD700",
                    });
                    window.location.reload();

                    setReadingLists((prevLists) => prevLists.filter((list) => list.id !== listId));
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.error('Unauthorized access - logging out');
                    handleLogout(navigate);   
                } else {
                    console.error('Error fetching books:', error);
                
                console.error("Error removing reading list:", error);
                Swal.fire("Error!", error.response?.data?.error || "Failed to remove reading list.", "error");
                }
            }
        }
    };

    const handleRemoveBookFromList = async (listId, bookId) => {
        const confirmRemove = await Swal.fire({
            title: "Remove book?",
            text: "Are you sure you want to remove this book from the list?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, remove it!",
        });

        if (confirmRemove.isConfirmed) {
            try {
                const response = await axios.delete('http://127.0.0.1:8000/api/reading-list/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                    data: { reading_list_id: listId, book_id: bookId },
                });

                if (response.status === 200) {
                    await Swal.fire({
                        title: "Deleted!",
                        text: "Your reading list has been removed.",
                        icon: "success",
                        confirmButtonColor: "#FFD700",
                    });
                    window.location.reload();

                    setReadingLists((prevLists) =>
                        prevLists.map((list) =>
                            list.id === listId
                                ? { ...list, books: list.books.filter((book) => book.id !== bookId) }
                                : list
                        )
                    );
                }
            } catch (error) {
                console.error("Error removing book:", error);
                Swal.fire("Error!", error.response?.data?.error || "Failed to remove book.", "error");
            }
        }
    };




    const handleAddBookToList = async (listId, bookId) => {
        try {
            const response = await axios.put(
                'http://127.0.0.1:8000/api/reading-list/',
                { reading_list_id: listId, book_ids: [bookId] },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            window.location.reload();

            setReadingLists((prevLists) =>
                prevLists.map((list) =>
                    list.id === listId ? { ...list, books: response.data.books } : list
                )
            );
            setUnreadBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Unauthorized access - logging out');
                handleLogout(navigate);  
            } else {
                console.error('Error fetching books:', error);
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen text-white">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-700">
                    <h2 className="text-2xl font-bold mb-6 text-blue-400">Create Reading List</h2>
                    <form onSubmit={handleCreateList} className="space-y-4">
                        <input
                            type="text"
                            value={newList}
                            onChange={(e) => setNewList(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-600 text-white rounded-lg p-2 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                            placeholder="Enter list name"
                            required
                        />
                        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg">
                            Create List
                        </button>
                    </form>
                </div>
                <div className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-700">
                    <h2 className="text-2xl font-bold mb-6 text-blue-400">Your Reading Lists</h2>
                    {readingLists.length === 0 ? (
                        <p className="text-gray-500">No reading lists available.</p>
                    ) : (
                        readingLists.map((list) => (
                            <div key={list.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700 mb-4 relative">
                                <button
                                    onClick={() => handleRemoveReadingList(list.id)}
                                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                >
                                    <Trash2 size={20} />
                                </button>

                                <h3 className="text-xl font-semibold text-blue-300 mb-2">{list.name}</h3>
                                <div>
                                    {list.books?.length === 0 ? (
                                        <p className="text-gray-400">No books in this list.</p>
                                    ) : (
                                        list.books.map((book) => (
                                            <div key={book.id} className="flex justify-between items-center text-gray-300">
                                                <p>{book.title} by {book.authors}</p>
                                                <button
                                                    onClick={() => handleRemoveBookFromList(list.id, book.id)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>

                                <select
                                    className="w-full bg-gray-800 border border-gray-600 text-white rounded-lg p-2 mt-2"
                                    onChange={(e) => {
                                        if (e.target.value) {
                                            handleAddBookToList(list.id, e.target.value);
                                            e.target.value = "";  
                                        }
                                    }}
                                    defaultValue=""
                                >
                                    {unreadBooks.length > 0 ? (
                                        <>
                                            <option value="" disabled>
                                                Add a book to this list
                                            </option>
                                            {unreadBooks.map((book) => (
                                                <option key={book.id} value={book.id} className="text-black">
                                                    {book.title} by {book.authors}
                                                </option>
                                            ))}
                                        </>
                                    ) : (
                                        <option value="" disabled>
                                            No books available
                                        </option>
                                    )}
                                </select>

                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReadingLists;
