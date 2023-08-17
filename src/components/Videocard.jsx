import React ,{useState} from 'react'
import {Card, Modal} from 'react-bootstrap'
import { Trash2 } from 'react-feather'
import {addhistory, deleteVideos} from '../services/AllApi'
import { v4 as uuidv4 } from 'uuid';

function Videocard({card,handleDeleteStatus,insideCategory}) {
 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = async() => {
    setShow(true);
    const uid = uuidv4();
    const {caption,url}=card
    let cardDatetime= new Date()
    console.log(cardDatetime); 
    if(uid!=""&& caption!="" && url!="" && cardDatetime!=""){
     const body = {
      id:uid,cardname:caption,url,date:cardDatetime
     };
      // add body to json
    const response = await addhistory(body)
    console.log(response);
    }
   
  }
  // video remove
  const removeItem = async (id)=>{
    // make api call
    const response = await deleteVideos(id)
    console.log(response);
    if(response.status>=200 && response.status<300){
      handleDeleteStatus(true)
    }
  }
  // drag started
  const dragStarted = (e,id)=>{
    console.log("Drag started and card id is"+id);
    e.dataTransfer.setData("cardId",id)
  }

  return (
   <>
   <Card  style={{ height: '300px' }} className='shadow' draggable onDragStart={e=>dragStarted(e,card?.id)}>
      <Card.Img onClick={handleShow} variant="top" height={'200px'} src={card?.thumbnail} />
      <Card.Body>
        <Card.Title>
            <span>{card?.caption.slice(0,15)}...</span>
            {
              insideCategory?"":
              <span onClick={()=>removeItem(card?.id)} style={{float:'right'}} color='red'>
            <Trash2 /></span>}
        </Card.Title>
        
        
      </Card.Body>
    </Card>
     {/* modal */}
     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Video Caption</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <iframe width={"100%"} height={'400px'} src={`${card?.url}`} title="Full Video: Karinthol Song (Malayalam) - RRR - NTR, Ram Charan | M M Keeravaani | SS Rajamouli" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </Modal.Body>
        
      </Modal>
    </>
  )
}

export default Videocard