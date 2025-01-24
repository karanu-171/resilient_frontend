import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../Navbar/navbar";
import axios from "axios";
const LoansDetail = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [loanSec, setLoanSec] = useState([]);
  const [loanData, setLoanData] = useState();
  const [token, setToken] = useState("");
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    async function getLoanData() {
      try {
        const response = await axios.get(
          `http://172.16.3.228:9600/api/v1/loan/loan/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLoanSec(response.data.entity.loanSchedule);
        setLoanData(response.data.entity.loan);
      } catch (error) {
        console.log(error);
      }
    }
    getLoanData();
  }, [id]);

  console.log(loanData?.sn);
  return (
    <div className="w-full">
      <Navbar />
      <div className="w-full px-5 mt-2">
        <div className="container-fluid">
          <div className="row w-full">
            <div className="col-md-12 mb-5 shadow p-1">
              <h4 className="mb-2">Loan Details</h4>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">SN</th>
                    <th scope="col">Principal Amount</th>
                    <th scope="col">Interest Rate</th>
                    <th scope="col">Interest Amount</th>
                    <th scope="col">Total Amount</th>
                    <th scope="col">Frequency Period</th>
                    <th scope="col">Repayment Period</th>
                    <th scope="col">Disbursement Date</th>
                    <th scope="col">Next Repayment Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr></tr>
                  <td>{loanData?.sn}</td>
                  <td>{loanData?.principalAmount}</td>
                  <td>{loanData?.interestRate}</td>
                  <td>{loanData?.interestAmount}</td>
                  <td>{loanData?.totalAmount}</td>
                  <td>{loanData?.frequencyPeriod}</td>
                  <td>{loanData?.repaymentPeriod}</td>
                  <td>{loanData?.disbursementDate}</td>
                  <td>{loanData?.nextRepaymentDate}</td>
                </tbody>
              </table>
            </div>
            <div className="col-md-12 shadow p-1">
              <h4 className="mb-2">loan Schedule Details</h4>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Installment Amount</th>
                    <th scope="col">Principal Amount</th>
                    <th scope="col">Interest Amount</th>
                    <th scope="col">Repayment Date</th>
                  </tr>
                </thead>
                <tbody>
                  {loanSec.map((loans, index) => (
                    <tr key={index}>
                      <td>{loans?.id}</td>
                      <td>{loans?.installmentAmount?.toFixed(2)}</td>
                      <td>{loans?.principalAmount?.toFixed(2)}</td>
                      <td>{loans?.interestAmount?.toFixed(2)}</td>

                      <td>{loans?.repaymentDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoansDetail;
