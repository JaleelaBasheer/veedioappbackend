import React from 'react'
import { Row ,Col} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


function LandingPage() {
    const navigate = useNavigate()


    const handleNavigate = ()=>{
        // navigate to home
        navigate('/home')
        
    }
  return (
    <Row className='align-items-center'>
        <Col lg={6}>
            <h1>Welcome Veedio.com</h1>
            <p style={{textAlign:"justify"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt laudantium delectus facere distinctio aliquid odit inventore accusantium molestias ullam aut totam harum, a earum, dolor perspiciatis. Sint at sit voluptate?</p>
            <button onClick={handleNavigate} className='btn btn-success'>Click here to know more</button>
        </Col>
        <Col lg={5}>
        <img width={'500px'} height={'500px'} className='img-fluid' src="https://www.pngall.com/wp-content/uploads/2/Upload-Transparent.png" alt="" />
        </Col>
    </Row>
  )
}

export default LandingPage