import React, { useState ,useEffect} from "react";
import Navbar from "../Navbar/navbar";
import axios from "axios";
import Swal from "sweetalert2";

const AddLoan = () => {
  const [principalAmt, setPrincipalAmt] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [frequency, setFrequency] = useState("WEEKS");
  const [repaymentPeriod, setRepaymentPeriod] = useState("");
  const [token,setToken] =  useState("");
  

  const handleLoanSave = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
      'http://197.155.71.138:8001/api/v1/loan/add', 
      {
        principalAmount: principalAmt,
        interestRate: interestRate,
        frequencyPeriod: frequency,
        repaymentPeriod:repaymentPeriod
      },
      {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      }
    );

    if(response.data.statusCode == 201){
     Swal.fire({
      title:'Loan Saving Status',
      text:'Loan added successfully',
      confirmButtonColor:'green'
     });
    }
    else{
      Swal.fire({
        title:'Loan Saving Status',
        text:'Loan failed to  add',
        confirmButtonColor:'red'
       });
    }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
   const token =  window.localStorage.getItem('token');
   if (token) {
    setToken(token);
  } 
  },[]);
  return (
    <div className="w-full">
      <Navbar />
      <div className="w-full mt-5 d-flex justify-content-center">
        <form className="shadow-lg p-4  w-75 border-radius-20px">
          <center>
            <h2 className="mb-4">Add Loan</h2>
          </center>
          <div className="row mb-4">
            <div className="form-group mb-4 col-md-6">
              <label htmlFor="principalAmount" className="justify-start mb-2">
                Principal Amount:
              </label>
              <input
                type="number"
                className="form-control py-3"
                id="principalAmount"
                value={principalAmt}
                onChange={(e) => setPrincipalAmt(e.target.value)}
              />
            </div>
            <div className="form-group col-md-6">
              <label className="justify-start mb-2" htmlFor="freq">
                Frequency Period:{" "}
              </label>
              <select
                className="form-select py-3"
                aria-label="Default select example"
                id="freq"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
              >
                <option value="YEARLY">Year</option>
                <option value="HALFYEAR">Half year</option>
                <option value="QUARTERLY">Quater year</option>
                <option value="MONTHS">Months</option>
                <option value="WEEKS">Weeks</option>
                <option value="DAILY">Daily</option>
              </select>
            </div>
          </div>
          <div className="row mb-4">
            <div className="form-group col-md-6">
              <label htmlFor="interestR" className="mb-2">
                Interest Rate
              </label>
              <input
                type="number"
                className="form-control py-3"
                id="interestR"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="repay" className="mb-2">
                Repayment Period
              </label>
              <input
                type="text"
                className="form-control py-3"
                id="repay"
                value={repaymentPeriod}
                onChange={(e) => setRepaymentPeriod(e.target.value)}
              />
            </div>
          </div>
          <div className="w-100 d-flex justify-content-center">
            <button
              type="submit"
              onClick={(e) => handleLoanSave(e)}
              className="btn btn-primary w-25 mt-4 py-3"
            >
              Save Loan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLoan;
