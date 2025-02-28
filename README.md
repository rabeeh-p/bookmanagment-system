# Django REST API Assessment - Book Management

## Project Overview
This project is a Django REST API for managing books, users, and reading lists. It allows users to register, log in, manage profiles, create and organize books, and maintain personal reading lists.

---

## Table of Contents
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Running the Project](#running-the-project)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [License](#license)

---

## Installation
To run this project locally, ensure you have the following dependencies installed:
- Python (>= 3.8)
- Django REST Framework
- PostgreSQL or SQLite

---

## Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/BookManagementAPI.git
   cd BookManagementAPI
   ```
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Apply migrations:
   ```bash
   python manage.py migrate
   ```
5. Create a superuser:
   ```bash
   python manage.py createsuperuser
   ```
6. Run the Django server:
   ```bash
   python manage.py runserver
   ```

---

## Running the Project
- Ensure the **backend** server is running.
- The backend API runs on `http://localhost:8000/`

---

## API Documentation
The backend exposes the following endpoints:

### Authentication
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/auth/register/` | Register a new user |
| POST | `/api/auth/login/` | Authenticate a user and return a token |
| GET | `/api/auth/profile/` | Retrieve logged-in user profile |
| PUT | `/api/auth/profile/` | Update user profile |

### Books
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/api/books/` | Retrieve all books |
| POST | `/api/books/` | Add a new book (Authenticated users) |
| GET | `/api/books/{id}/` | Retrieve book details |
| PUT | `/api/books/{id}/` | Update book details (Authenticated users) |
| DELETE | `/api/books/{id}/` | Remove a book (Authenticated users) |

### Reading Lists
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/api/reading-lists/` | Get all reading lists of the logged-in user |
| POST | `/api/reading-lists/` | Create a new reading list |
| PUT | `/api/reading-lists/{id}/` | Update a reading list |
| DELETE | `/api/reading-lists/{id}/` | Delete a reading list |

### Book Interactions
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/reading-lists/{id}/add-book/` | Add a book to a reading list |
| DELETE | `/api/reading-lists/{id}/remove-book/` | Remove a book from a reading list |

---

## Environment Variables
Create a `.env` file in the project directory and add:
```env
SECRET_KEY=your_secret_key
DEBUG=True
DATABASE_URL=your_database_url
ALLOWED_HOSTS=localhost,127.0.0.1
```

---

## License
This project is licensed under the MIT License.

---

### Author
**Rabeeh** - Backend (Django REST Framework)

Happy Coding! 🚀

