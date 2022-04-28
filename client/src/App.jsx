import React from 'react';
import 'materialize-css'
import {Routes, Route} from 'react-router-dom'
import { AuthPage, RegisterPage, ErrorPage } from './pages'

function App() {

  return (
    <div className="container">
      <Routes>
        <Route path='/' element={<AuthPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
