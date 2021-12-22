import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Homepage from './pages/Homepage';
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path='/' element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;
