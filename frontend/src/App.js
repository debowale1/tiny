import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Homepage from './pages/Homepage';
import Articlepage from './pages/Articlepage';
function App() {
  return (
    <Router>
      <Header />
      <main className='container'>
        <Routes>
          <Route path='/:id' element={<Articlepage />} />
          <Route exact path='/' element={<Homepage />} />
        </Routes>

      </main>
    </Router>
  );
}

export default App;
