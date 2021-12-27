import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
function App() {
  return (
    <Router>
      <Header />
      <main className='container'>
        <Routes>
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/:id' element={<ArticlePage />} />
          <Route exact path='/' element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
