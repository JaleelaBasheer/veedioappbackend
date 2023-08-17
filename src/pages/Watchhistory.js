import React, { useEffect, useState } from 'react'
import { gethistory } from '../services/AllApi'
import { Link } from "react-router-dom"


function Watchhistory() {

    const [history,sethistory] = useState([])

    const getwatchhistory = async ()=>{
        const {data} = await gethistory()
        sethistory(data)
    }
    console.log(sethistory);

    useEffect(()=>{
        getwatchhistory()
       },[])

  return (
    <>
    <div className='d-flex justify-content-between align-items-center'>
    <h1>   Watch History</h1>
<Link to={'/home'}>Back</Link>
    </div>
    <table className='table shadowvm-3 rounded-border'>
        <thead>
            <tr>
                <th>No</th>
                <th>Name</th>
                <th>URL</th>
                <th>Time</th>

            </tr>
        </thead>
        <tbody>
            {
                history?.map((item,index)=>(
               <tr>
                <td>{index+1}</td>
                <td>{item?.cardname}</td>
                <td>{item.url}</td>
                <td>{item.date}</td>

            </tr>              
                ))
            }
            
        </tbody>
    </table>
    </>  
)
}

export default Watchhistory