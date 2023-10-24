import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Auth from "./pages/auth";
import Home from "./pages/home";
import { NavBar } from "./components/navbar";
import Header from './components/header';
import Footer from "./components/footer";
import styles from "./pages/repsonsive.module.css";
import './App.css';

function App() {
  return (
    <div className="App">
    <Router> 
      <Header />
      <Routes> 
        <Route path='/' element={ <Home />} >  </Route>
        <Route path='/Auth' element= {<Auth />} >  </Route>
      </Routes>
      <Footer />
    </Router>
    </div>
  );
}

export default App;
