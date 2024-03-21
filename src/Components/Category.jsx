import { MDBBtn } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBInput } from 'mdb-react-ui-kit';
import { Col,Row } from 'react-bootstrap';
import { addCategory, getCategory, deleteCategory, getAVideo, updateCategory } from '../services/allAPI';
import VideoCard from './VideoCard';
function Category() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [categoryName, setCategoryName] = useState("");//to hold category name

  const [categoryData, setCategoryData] = useState([]);//to hold category data

  console.log(categoryName);

  const handleCategory = async () => {
    if (categoryName) {
      //make api call
      const reqBody = {
        categoryName
      }
      const response = await addCategory(reqBody)
      console.log(response);
      alert("category added Successfully")
      handleClose()
      setCategoryName("")//reset the state
      getCatrgoryVideos()
    }
    else {
      alert("Please provide a category name")
    }
  };

  const getCatrgoryVideos = async () => {
    //make an api call
    const { data } = await getCategory();
    console.log(data);
    setCategoryData(data)
  };

  const handleDelete = async (id) => {
    //make an api call
    await deleteCategory(id)
    getCatrgoryVideos()
  }

  console.log(categoryData);//array of categories

  useEffect(() => {
    getCatrgoryVideos();
  }, []);

  const videoDrop = async (e, CategoryId) => {
    console.log("Video dropped at" + CategoryId);
    const videoId = e.dataTransfer.getData("videoId")
    console.log("videoCardId: " + videoId);
    //api call for particular video
    const { data } = await getAVideo(videoId)
    console.log(data);
    //get category details
    const selectedCategory = categoryData?.find(item => item.id == CategoryId)
    console.log(selectedCategory);
    //video details push to allVideo  array
    selectedCategory.allVideos.push(data)
    //make an api call to update details
    await updateCategory(CategoryId, selectedCategory)
    getCatrgoryVideos()
  }

  const dragOver = (e) => {
    console.log("Drag Over");
    e.preventDefault()
  }

  return (
    <div><br />

      <MDBBtn onClick={handleShow}>Add Category</MDBBtn>
      <div>
        {
          categoryData.length > 0 ? categoryData.map((item) => (
            <div droppable onDragOver={(e) => dragOver(e)} onDrop={(e) => videoDrop(e, item.id)} className='container border border-1 m-4 shadow'>
              <div className='d-flex justify-content-between p-3'>
                <h5>{item.categoryName}</h5>
                <button onClick={() => handleDelete(item.id)} className='btn'>
                  <i className='fa-solid fa-trash text-danger'></i>
                </button>
              </div>
              <Row>
                {
                  item.allVideos.map((data)=>(
                    <Col>
                    <VideoCard displayData={data}/>
                    </Col>
                  ))
                }
              </Row>
            </div>
          )) : "No Category Selected"
        }
      </div>


      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <MDBInput label='Category Id' id='form1' type='text' /><br /> */}
          <MDBInput onChange={(e) => setCategoryName(e.target.value)} label='Category Name' id='form1' type='text' /><br />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={(e) => handleCategory()} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>

    </div >
  )
}

export default Category