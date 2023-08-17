import React, {useState} from 'react'
import { PlusCircle} from 'react-feather'
import { Modal,Button,Form,FloatingLabel } from 'react-bootstrap';
import { addVideo } from '../services/AllApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Add({handleRes}) {
  const [uploadData, setUploadData] = useState({
    id: "",
    caption: "",
    thumbnail: "",
    url: "",
  });
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setInput = (e)=>{
    const {name,value} = e.target
    setUploadData({...uploadData,[name]:value})
  }

  const extractUrl = (e)=>{
    let youtubeUrl = e.target.value
    if(youtubeUrl.includes("v=")){
      let index = youtubeUrl.indexOf("v=")
      let videourl = youtubeUrl.substring(index+2,index+13)
      let videoData = uploadData
      videoData.url=`https://www.youtube.com/embed/${videourl}`
      setUploadData(videoData)
     
    }
    console.log(uploadData);
  }
  const handleAdd = async ()=>{
    const {id,caption,thumbnail,url} = uploadData
    if (!id || !caption || !thumbnail || !url){
      toast.warning("Please fill the form")
    }
    else{
      // make api call
      const response = await addVideo(uploadData)
      if(response.status>=200 && response.status<300){
        handleRes(response.data);
        setShow(false)

       toast.success("New video upload successfullyyy!!!")
      }
      else{
        toast.warning("Provide a unique id")
      }
    }
  }

  return (
    <>
    <div className='btn' onClick={handleShow}>
        <PlusCircle color='grey' size={100}/>
    </div>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Video Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form >
                <FloatingLabel className='mb-3' controlId="floatingid" label="Uploading Video Id">
        <Form.Control onChange={setInput} type="text" name="id" placeholder="Uploading Video Id" />
      </FloatingLabel>

      <FloatingLabel  className='mb-3' controlId="floatingcaption" label="Uploading Video Caption">
        <Form.Control onChange={setInput} type="text" name="caption" placeholder="Uploading Video Caption" />
      </FloatingLabel>

      <FloatingLabel  className='mb-3' controlId="floatingimage" label=" Video Image Cover URL">
        <Form.Control  onChange={setInput} name="thumbnail" type="text" placeholder=" Video Image Cover URL" />
      </FloatingLabel>

      <FloatingLabel className='mb-3' controlId="floatinglink" label="Youtube Video Link">
        <Form.Control onChange={extractUrl} name="url" type="text" placeholder="Youtube Video Link" />
      </FloatingLabel>

            </form>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <div onClick={handleClose}>
          <Button onClick={handleAdd} variant="success">Add</Button>
          </div>

        </Modal.Footer>
      </Modal>
      <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark" />
    
    </>
  )
}

export default Add