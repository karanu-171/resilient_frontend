import React,{useState,useEffect} from "react";
import Navbar from "../Navbar/Navbar";
import DataTable from "../Datatable/Datatable";
import axios from "axios";
const ShowLoan = () => {
  const [token, setToken] = useState("");
  const [data,setData] =  useState([]);
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setToken(token);
    } 
  
  }, []);
  useEffect(()=>{
    async function getAllLoans() {
     try {
      const  response  =  await axios.get('http://197.155.71.138:8001/api/v1/loan/all',{
        headers: {
          Authorization: `Bearer ${token}` 
        }});
       setData(response.data[0].entity);
     } catch (error) {
      console.log(error)
     }
      
    }
    getAllLoans();
  },[])

  return (
    <div className="w-full">
      <Navbar />
      <div className="w-full mt-2 d-flex justify-content-center">
        <div className="w-75 p-3 shadow-lg">
          <h4 className="mb-2">Loans List</h4>
          <DataTable data={data}/>
        </div>
      </div>
    </div>
  );
};

export default ShowLoan;
