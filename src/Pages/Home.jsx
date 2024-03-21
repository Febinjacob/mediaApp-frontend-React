import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MDBBtn } from 'mdb-react-ui-kit';
import Add from '../Components/Add';
import { Link } from 'react-router-dom';
import View from '../Components/View';
import Category from '../Components/Category';

function Home() {
 //Create a state for state lifting (In parent components)
  const [uploadVideoServerResponse,setUploadVideoServerResponse]=useState({})

  return (
    <div><br />
      <Row className='container'>
        <Col>
          <Add setUploadVideoServerResponse={setUploadVideoServerResponse} />
        </Col>
        <Col xl={4} className='text-center'>
          <Link to={'/watch-history'}>
            <h4>Watch History</h4>
          </Link>
        </Col>
      </Row>
<br />

      <Row>
        <Col className='m-5'>
          <h3>View All videos</h3>
          <View uploadVideoServerResponse={uploadVideoServerResponse} />
        </Col>
        <Col className='m-5'>
          <h3>Add Catagory</h3>
          <Category />
        </Col>
      </Row>



    </div>
  )
}

export default Home