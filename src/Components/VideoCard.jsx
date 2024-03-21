import React, { useState } from 'react'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple
} from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBInput } from 'mdb-react-ui-kit';
import { deleteAVideo } from '../services/allAPI';
import { watchVideoHistory } from '../services/allAPI';


function VideoCard({ displayData, setdeleteVideoStatus }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = async () => {
    setShow(true);
    //make an api call to get the video watch history 
    const{caption,embedLink}=displayData

    //date and time 
    let today = new Date()
    console.log(today);
    const timestamp = new Intl.DateTimeFormat('en-us',{year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit'}).format(today);
    console.log(timestamp);//11/07/2023, 09:43:46 AM

    let VideoDetails={
      caption,
      embedLink,
      timestamp

    }
    await watchVideoHistory(VideoDetails)
  }

  //deleting a video
  const deleteVideo = async (id) => {
    //make api call
    const response = await deleteAVideo(id)
    console.log(response);
    alert("Video deleted")
    setdeleteVideoStatus(true)
  }

  const dragStarted=(e,id)=>{
    console.log("Drag Started"+id,e);
    e.dataTransfer.setData("video",id)//Data transfer
   
  }



  return (
    <div><br />
      <MDBCard draggable onDragStart={(e)=>dragStarted(e,displayData?.id)} style={{ width: '250px', height: '250px' }}>
        <MDBRipple onClick={handleShow} rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
          <MDBCardImage src={displayData.url} fluid alt='...' />
          <a>
            <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
          </a>
        </MDBRipple>
        <MDBCardBody className='d-flex'>
          <MDBCardTitle><h6>{displayData.caption}</h6></MDBCardTitle>
          <MDBBtn onClick={() => deleteVideo(displayData.id)} className='ms-5'><i  class="fa-solid fa-trash text-danger fs-6"></i></MDBBtn>
        </MDBCardBody>
      </MDBCard>



      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>View Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe width="460" height="315" src={displayData.embedLink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default VideoCard