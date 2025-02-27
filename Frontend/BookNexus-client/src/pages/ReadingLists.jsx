import { useState } from 'react';
// import { useAuth } from '../contexts/AuthContext';
import { dummyBooks, dummyReadingLists } from '../data/dummyData';
// import toast from 'react-hot-toast';

const ReadingLists = () => {
//   const { user } = useAuth();
  const [readingLists, setReadingLists] = useState(dummyReadingLists);
  const [books] = useState(dummyBooks);
  const [newList, setNewList] = useState({ name: '' });

  const handleCreateList = (e) => {
    e.preventDefault();
    try {
      const newReadingList = {
        id: readingLists.length + 1,
        name: newList.name,
        user_id: user?.id || 'dummy-user',
        reading_list_books: []
      };
      setReadingLists([...readingLists, newReadingList]);
      toast.success('Reading list created!');
      setNewList({ name: '' });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAddBookToList = (listId, bookId) => {
    try {
      const book = books.find(b => b.id === parseInt(bookId));
      const updatedLists = readingLists.map(list =>
        list.id === listId
          ? {
              ...list,
              reading_list_books: [
                ...list.reading_list_books,
                {
                  id: list.reading_list_books.length + 1,
                  book_id: parseInt(bookId),
                  books: book
                }
              ]
            }
          : list
      );
      setReadingLists(updatedLists);
      toast.success('Book added to list!');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen text-white">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Create Reading List Section */}
        <div className="bg-[#1A1A1A] p-6 rounded-2xl shadow-lg border border-[#333333]">
          <h2 className="text-2xl font-bold mb-6 text-[#3B82F6]">Create Reading List</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateList(newList);
              setNewList({ name: "" });
            }}
            className="space-y-4"
          >
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
            <button type="submit" className="btn w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold py-2 rounded-lg transition">
              Create List
            </button>
          </form>
        </div>

        {/* Your Reading Lists Section */}
        <div className="bg-[#1A1A1A] p-6 rounded-2xl shadow-lg border border-[#333333]">
          <h2 className="text-2xl font-bold mb-6 text-[#3B82F6]">Your Reading Lists</h2>
          <div className="space-y-6">
            {readingLists.map((list) => (
              <div key={list.id} className="bg-[#252525] p-4 rounded-lg border border-[#444444] shadow-md hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-[#93C5FD] mb-4">{list.name}</h3>
                <div className="space-y-2">
                  {list.reading_list_books.map((item) => (
                    <div key={item.id} className="text-gray-300">
                      {item.books.title} by {item.books.author}
                    </div>
                  ))}
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
                    {books.map((book) => (
                      <option key={book.id} value={book.id} className="text-black">
                        {book.title} by {book.author}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingLists;
