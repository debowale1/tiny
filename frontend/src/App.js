import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Homepage from './pages/Homepage';
import Articlepage from './pages/Articlepage';
import Loginpage from './pages/Loginpage';
function App() {
  return (
    <Router>
      <Header />
      <main className='container'>
        <Routes>
          <Route path='/login' element={<Loginpage />} />
          <Route exact path='/' element={<Homepage />} />
          <Route path='/:id' element={<Articlepage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
