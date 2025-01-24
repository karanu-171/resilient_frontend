import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Do you want to Logout?",
      showDenyButton: true,
      icon: "success",
      confirmButtonText: "Yes",
      denyButtonText: `No`
    }).then((result) => {
      if (result.isConfirmed) {
        window.localStorage.removeItem('token');
        navigate('/');  
      }
    });
  };
  

  useEffect(()=>{
   const  token = window.localStorage.getItem('token');
   if(!token){
    window.location.href ="/";
   }
  },[])
  return (
    <nav className="navbar navbar-expand-lg navbar-light py-4 bg-light shadow-lg mb-5 px-4">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <Link className="navbar-brand" to="#">
          Loan Calculator
        </Link>
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            <Link className="nav-link" to="/add">
              Add Loan
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/get">
              View Loans
            </Link>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0 ms-auto">
          <button
            className="btn btn-danger my-2 my-sm-0"
            type="submit"
            onClick={(e) => handleLogout(e)}
          >
            Logout
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
