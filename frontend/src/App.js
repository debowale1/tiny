import Header from './components/Header'
import FeaturedPosts from './components/FeaturedPosts'
import Sidebar from './components/Sidebar'
import BlogItem from './components/BlogItem'
function App() {
  return (
    <>
      <Header />
      <main className='container'>
        <FeaturedPosts />
        <div className="row g5">
          <div className="col-md-8">
            <BlogItem />
            <BlogItem />
            <BlogItem />
            <BlogItem />
          </div>
          <div className="col-md-4">
            <Sidebar />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
