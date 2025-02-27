export const dummyBooks = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Classic Literature",
      publication_date: "1925-04-10",
      description: "A story of decadence and excess, Gatsby explores themes of wealth, love, and the American Dream."
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      genre: "Science Fiction",
      publication_date: "1949-06-08",
      description: "A dystopian novel set in a totalitarian society, exploring themes of surveillance and control."
    },
    {
      id: 3,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      genre: "Romance",
      publication_date: "1813-01-28",
      description: "A romantic novel following the emotional development of Elizabeth Bennet."
    },
    {
      id: 4,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      genre: "Fantasy",
      publication_date: "1937-09-21",
      description: "A fantasy novel about the adventures of Bilbo Baggins."
    }
  ];
  
  export const dummyReadingLists = [
    {
      id: 1,
      name: "Classic Literature",
      user_id: "dummy-user",
      reading_list_books: [
        {
          id: 1,
          book_id: 1,
          books: dummyBooks[0]
        }
      ]
    },
    {
      id: 2,
      name: "Science Fiction",
      user_id: "dummy-user",
      reading_list_books: [
        {
          id: 2,
          book_id: 2,
          books: dummyBooks[1]
        }
      ]
    }
  ];
  
  export const dummyUser = {
    id: "dummy-user",
    email: "user@example.com",
    user_metadata: {
      username: "DummyUser"
    }
  };