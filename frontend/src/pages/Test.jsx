import Header from "../components/header"
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Test(){
    return(
      <div>
      <Header />
      <h1>test</h1>
      <p>
        description
      </p>

    </div>
    );
}

/*const Test = () => {
    const [test, setTest] = useState([])

    useEffect(() => {
        const fetchDepartment = async ()=>{
            try{
                const res = await axios.get("/http:localhost:3000/testquery")
                console.log(res)
            }catch(err){
                console.log(err)
            }
        }
        fetchDepartment()
    },[])

    return(
        <div>Test</div>
    )
}
    */