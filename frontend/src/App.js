import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage';
import PostsByCategoryPage from './pages/PostsByCategoryPage';
import ArticlePage from './pages/ArticlePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import UpdatePasswordPage from './pages/UpdatePasswordPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import AdminPostListPage from './pages/AdminPostListPage';
import AdminCategoryListPage from './pages/AdminCategoryListPage';
import AdminCommentListPage from './pages/AdminCommentListPage';
import AdminUserListPage from './pages/AdminUserListPage';
import AdminCreatePostPage from './pages/AdminCreatePostPage';
import AdminCreateCategoryPage from './pages/AdminCreateCategoryPage';
import AdminCreateUserPage from './pages/AdminCreateUserPage';
import AdminEditPostPage from './pages/AdminEditPostPage';
import AdminEditCategoryPage from './pages/AdminEditCategoryPage';
import AdminEditUserPage from './pages/AdminEditUserPage';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <Router>
      <Header />
      <main className='container' style={{ minHeight: '70vh'}}>
        <Routes>
          <Route path='/tiny-admin/user/:id/edit' element={<AdminEditUserPage />} />
          <Route path='/tiny-admin/category/:id/edit' element={<AdminEditCategoryPage />} />
          <Route path='/tiny-admin/post/:id/edit' element={<AdminEditPostPage />} />
          <Route path='/tiny-admin/create-user' element={<AdminCreateUserPage />} />
          <Route path='/tiny-admin/create-category' element={<AdminCreateCategoryPage />} />
          <Route path='/tiny-admin/create-post' element={<AdminCreatePostPage />} />
          <Route path='/tiny-admin/categories' element={<AdminCategoryListPage />} />
          <Route path='/tiny-admin/comments' element={<AdminCommentListPage />} />
          <Route path='/tiny-admin/posts' element={<AdminPostListPage />} />
          <Route path='/tiny-admin/users' element={<AdminUserListPage />} />
          <Route path='/tiny-admin' element={<AdminPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/update-my-password' element={<UpdatePasswordPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/search/:keyword' element={<SearchPage />} />
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
