import AdminHeader from "../components/adminHeader"
import React, { useEffect, useState } from 'react'
import { Input } from "../components/dasboard";
import axios from 'axios'

const Click = async e =>{
  e.preventDefault()
  try{
    await axios.post("http://localhost:3000",)
  }
  catch(err){

  }
}

export default function Parkstatus(){
    return(
      <div className='Parkstatus'>
        <AdminHeader></AdminHeader>
        <h1>Day Details</h1>
        <form action="" className='Parkstatusform'>
            <Input
            inputNaming={"Parkstatusdate"}
            inputText={"Date"}
            inputType={"date"}
            req
            />
             <div>
            <select name="Weather" id="weather" required>
              <option value="Weather type" disabled selected>
                Select Weather type
              </option>
              <option value="Fair">Fair</option>
              <option value="Cloudy">Cloudy</option>
              <option value="Rainout">Rainout</option>
            </select>
          </div>

            <button onClick={Click}>Submit</button>
        </form>
    </div>
    );
}
