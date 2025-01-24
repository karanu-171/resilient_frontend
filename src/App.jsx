import { React } from 'react'
import './App.css'
import {  Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login'
import AddLoan from './components/Loan/AddLoan'
import ShowLoan from './components/Loan/ShowLoan'
import PrivateRoute from './components/AuthProtection/PrivateRoute';
import LoansDetail from './components/LoanDetails/LoansDetail';
function App() {

  return (
    <div className='App'>
      <Routes>
      <Route path='/' element={<Login/>}/>
      <Route element={<PrivateRoute />}>
          <Route path="/add" element={<AddLoan />} />
          <Route path="/get" element={<ShowLoan />} />
          <Route path ="/loandetails" element ={<LoansDetail/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
