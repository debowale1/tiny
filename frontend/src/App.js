import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage';
import PostsByCategoryPage from './pages/PostsByCategoryPage';
import ArticlePage from './pages/ArticlePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import AdminPostListPage from './pages/AdminPostListPage';
import AdminCategoryListPage from './pages/AdminCategoryListPage';
import AdminCreatePostPage from './pages/AdminCreatePostPage';
import AdminEditPostPage from './pages/AdminEditPostPage';
import AdminEditCategoryPage from './pages/AdminEditCategoryPage';

function App() {
  return (
    <Router>
      <Header />
      <main className='container' style={{ minHeight: '70vh'}}>
        <Routes>
          <Route path='/tiny-admin/category/:id/edit' element={<AdminEditCategoryPage />} />
          <Route path='/tiny-admin/post/:id/edit' element={<AdminEditPostPage />} />
          <Route path='/tiny-admin/create-post' element={<AdminCreatePostPage />} />
          <Route path='/tiny-admin/categories' element={<AdminCategoryListPage />} />
          <Route path='/tiny-admin/posts' element={<AdminPostListPage />} />
          <Route path='/tiny-admin' element={<AdminPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/category/:id' element={<PostsByCategoryPage />} />
          <Route path='/:id' element={<ArticlePage />} />
          <Route exact path='/' element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
