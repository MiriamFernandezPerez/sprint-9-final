import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Selection from './pages/Selection';
import Search from './pages/Search';
import Category from './pages/Category'
import Login from './pages/Login';
import Register from './pages/Register';
import Tpv from './pages/Tpv';
import GuardedRoute from './components/GuardedRoute/GuardedRoute';
import { DataProvider } from './useContext/DataContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Header></Header>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='selection' element={<Selection />} />
            <Route path="/search" element={<Search />} />
            <Route path="/category" element={<Category />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<GuardedRoute />}>
              <Route path="/tpv" element={<Tpv />} />
            </Route>
          </Routes>
        </Router>
        <Footer></Footer>
      </DataProvider>
    </div>
  );
}

export default App;
