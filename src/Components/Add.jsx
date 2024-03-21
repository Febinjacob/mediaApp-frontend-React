import { MDBBtn } from 'mdb-react-ui-kit';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBInput } from 'mdb-react-ui-kit';
import { Col } from 'react-bootstrap';
import { uploadVideo } from '../services/allAPI';

function Add({setUploadVideoServerResponse}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //to hold the video details
  const [video,setVideo]=useState({
    id:"",
    caption:"",
    url:"",
    embedLink:""
  })

  console.log(video);
 
  const getEmbedLink=(e)=>{
    const {value}=e.target
    if (value) {
      console.log(value.slice(-31));
      const link =`https://www.youtube.com/embed/${value.slice(-31)}`
      setVideo({...video,embedLink:link})
      
    }
    else{
      setVideo({...video,embedLink:""})
    }

  }
   
  const handleAdd=async ()=>{
    const{id,caption,url,embedLink}=video
    if (!id||!caption||!url||!embedLink) {
      alert("Please enter valid details")
    }
    else{
      //make an api call to add video to db.json file
      const response = await uploadVideo(video)
      console.log(response);
      if (response.status>=200 && response.status<=300) {
        setUploadVideoServerResponse(response.data)
        alert(`${response.data.caption} Added Successfully`)
        handleClose()
      }
      else{
        alert("Plese Enter Valid Id")
      }
    }
  }

  return (
    <div>
      <Col xl={6} className='text-center d-flex justify-content-center'>
      <h4>Upload Video</h4>
          <MDBBtn onClick={handleShow}  className='mx-4'><i class="fa-solid fa-arrow-up-from-bracket"></i></MDBBtn>
          <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <MDBInput onChange={(e)=>setVideo({...video,id:e.target.value})} label='Video Id'  type='text' /><br />
        <MDBInput onChange={(e)=>setVideo({...video,caption:e.target.value})} label='Video Caption'  type='text' /><br />
        <MDBInput onChange={(e)=>setVideo({...video,url:e.target.value})} label='Video Image URL'  type='text' /><br />
        <MDBInput onChange={getEmbedLink} label='Youtube Video Link' id='form1' type='text' /><br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button onClick={handleAdd} variant="primary">Add</Button>

        </Modal.Footer>
      </Modal>
      </Col>
    </div>
  )
}

export default Add