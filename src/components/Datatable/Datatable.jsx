import React from 'react';
import { Link } from 'react-router-dom';

const DataTable = ({ data }) => {
   
  return (
 <div>
  <table className="table">
    <thead>
      <tr>
      <th scope="col">Serial Number</th>
      <th scope="col">Principal Amount</th>
      <th scope="col">Interest Rate (%)</th>
      <th scope="col">Interest Amount</th>
      <th scope="col">Total Amount</th>
      <th scope="col">Frequency Period</th>
      <th scope="col">Repayment Period</th>
      <th scope="col">View</th> 
      </tr>
    </thead>
    <tbody>

      {data.map((da,index)=>(
      <tr key={index}>
         <td>{da.sn}</td>
         <td>{da.principalAmount}</td>
         <td>{da.interestRate}</td>
         <td>{da.interestAmount}</td>
         <td>{da.totalAmount}</td>
         <td>{da.frequencyPeriod}</td>
         <td>{da.repaymentPeriod}</td>
         <td>
            <Link to={`/loandetails?id=${da.sn}`} className='bg-success text-white text-decoration-none p-2' >View More Info</Link>
         </td>
      </tr>
      ))}

    </tbody>
  </table>
</div>

  );
};

export default DataTable;
