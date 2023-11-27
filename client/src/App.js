import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from "react";

import './App.css';
import Auth from "./pages/auth";
import Home from "./pages/home";
import { NavBar } from "./components/navbar";
import Header from './components/header';
import Footer from "./components/footer";
import styles from "./pages/repsonsive.module.css";
import './App.css';
import { AddProperty } from './pages/addProperty';
import MyProperties from './pages/myproperties';
import Profile  from './pages/profile';
import BrokerList from './pages/brokerList';
import MyOffers from './pages/myoffers';
import OfferManagement from './pages/offermanagement';
import Founders from './pages/founders';

function App() {
  const [isBroker, setIsBroker] = useState(false);
  return (
    <div className="App">
    <Router> 
      <Header />
      <Routes> 
        <Route path='/' element={ <Home />} >  </Route>
        <Route path='/BrokerList' element={ <BrokerList /> } > </Route>
        <Route 
          path='/Auth'
          element= {<Auth 
                      isBroker={isBroker} 
                      setIsBroker={setIsBroker} 
                      />} >  </Route>
        <Route path='/addProperty' element={ <AddProperty /> } >  </Route>

        <Route
          path='/MyOffers'
          element= {<MyOffers />}
          >
           </Route>
        <Route 
          path='/OfferManagement'
          element= {<OfferManagement />}
          >
          </Route>

          <Route 
          path='/Founders'
          element= {<Founders />}
          >
          </Route>
          

        <Route 
          path='/MyProperties'
          element = { <MyProperties />}
        > </Route>
        <Route path='/profile' element={ <Profile /> } >  </Route>
      </Routes>
      <Footer />
    </Router>
    </div>
  );
}

export default App;
