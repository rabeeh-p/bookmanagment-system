import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Books from './pages/Books';
import ReadingLists from './pages/ReadingLists';
import RegistrationForm from './pages/RegistrationForm';
import LoginForm from './pages/LoginForm';


function App() {

  return (
    <Router>
        <Navbar/>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/readingList" element={<ReadingLists />} />

          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
