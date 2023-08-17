import React,{useEffect, useState} from 'react'
import {Button,Modal,FloatingLabel,Form,Row,Col,Card} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addcategory, deletecategories, getallcategory, getsinglevideo, updateCategory } from '../services/AllApi';
import { Trash2 } from 'react-feather';
import Videocard from './Videocard';

function Category() {

   const [allCategory,setallCategory] = useState([])
  // function for get category
  const getcategorylist = async()=>{
    // all category after making api call
    const response = await getallcategory()
    console.log(response);
    setallCategory(response.data);


  }
  useEffect(()=>{
    getcategorylist()
   },[])
 

  const [categoryItem,setCateggoryItem]=useState({
    id:"",
    categoryname:"",
    allvideos:[]
  })
  const addCategoryForm = (e)=>{
    const {name,value} = e.target
    setCateggoryItem({...categoryItem,[name]:value})

  }
  // console.log(categoryItem);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAddCategory = async (e)=>{
    e.preventDefault()
    const {id,categoryname} = categoryItem
    if(!id || !categoryname){
    toast.warning("Please Fill the form")
    }
    else{
      const response = await addcategory(categoryItem)
      console.log(response);
      if(response.status>=200 && response.status<300){
        setShow(false)

       toast.success("New category added successfullyyy!!!")
      getcategorylist()
      }
      else{
        toast.warning("Provide a unique id")
      }
    }
  }
  const handleDeleteCategory = async (e,id)=>{
    e.preventDefault()
  // remove categoryby given id
  await deletecategories(id)
  getcategorylist()
  }
  const dragOver = e=>{
    e.preventDefault()
    console.log("Dragging over the category board!!!");
  }

  // dropped
  const dropped = async (e,categoryId)=>{
    console.log("categoryid",categoryId);
    let sourcecardid=e.dataTransfer.getData("cardId")
    console.log("source card id is",sourcecardid);
    // logic to implement adding card in the given category
    let {data} = await getsinglevideo(sourcecardid)
    console.log("Source video data",data);

    let selectedCategory = allCategory.find(item=>item.id==categoryId)
    console.log("Target category details",selectedCategory);
    selectedCategory.allvideos.push(data)
    console.log("Updated Target category details",selectedCategory);
    await updateCategory(categoryId,selectedCategory)
    getcategorylist()
  }
  return (
    <>
    <div className="d-grid">
        <button onClick={handleShow} className="btn btn-dark m-2">
            Add Categories
        </button>
    </div>

    {
      allCategory?.map(item=>(
< div>       <div className='d-flex justify-content-between border rounded mt-2 p-3' droppable 
        onDragOver={e=>dragOver(e)}
        onDrop={e=>dropped(e,item?.id)}
        > 
          <h4>{item?.categoryname}</h4>
          <span onClick= {e=>handleDeleteCategory(e,item?.id)}><Trash2 color='red'/></span>
        </div>
        <Row>
          {
            item?.allvideos.map(card=>(
              <Col className='p-3 mb-1' sm={12}>
 
    <Videocard card={card} insideCategory={true}/>
              </Col>
            ))
          }
        </Row>
        </div>
      ))
    }

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
    <Modal.Header closeButton>
          <Modal.Title>Add Category Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form >
                <FloatingLabel className='mb-3' controlId="floatingid" label="Id">
        <Form.Control type="text" placeholder="Id" name="id"  onChange={addCategoryForm}/>
      </FloatingLabel>
      <FloatingLabel className='mb-3' controlId="floatingcategory" label="Category">
        <Form.Control type="text" name="categoryname" placeholder="Category Name" onChange={addCategoryForm} />
      </FloatingLabel>
      </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleAddCategory} variant="primary">Add</Button>
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

export default Category