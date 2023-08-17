import React, {useEffect, useState} from 'react'
import {Col,Row} from 'react-bootstrap'
import Videocard from '../components/Videocard'
import { getVideos } from '../services/AllApi'



function View({serverRes}) {
  const [deleteStatus,setDeleteStatus] = useState(false)
  const handleDeleteStatus = (res)=>{
   setDeleteStatus(res)
  }
  const [allvideos,setallvideos] = useState([])
  const getallvideos = async ()=>{
    const response = await getVideos()
    setallvideos(response.data);
  }

  useEffect(()=>{
   getallvideos()
  },[serverRes,deleteStatus])

  return (
    <div className='border p-3 rounded'>
        <Row>
          {
            allvideos.map(video=>(
              <Col className='ps-3 mb-3' sm={12} md={6} lg={4}>
              <Videocard card={video} handleDeleteStatus={handleDeleteStatus}/>
              </Col>
            ))
           

            
}
        </Row>

    </div>
  )
}

export default View