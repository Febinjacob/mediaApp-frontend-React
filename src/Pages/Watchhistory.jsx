import React, { useEffect, useState } from 'react'
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { getVideoHistory } from '../services/allAPI';

function Watchhistory() {
  const [history, setHistory] = useState([])

  const handleHistory = async () => {
    //make an api call to get the watch history
    const { data } = await getVideoHistory()
    console.log(data);
    setHistory(data)
  }
  console.log(history);
  useEffect(() => {
    handleHistory()
  }, [])

  return (
    <div className='container m-5'>
      <h3>Watch History</h3>
      <div style={{ paddingLeft: '70rem' }}>
        <Link>
          <MDBBtn>Back To Home</MDBBtn>
        </Link>
      </div>
      <br />
      <MDBTable hover>
        <MDBTableHead>
          <tr>
            <th scope='col'>Id</th>
            <th scope='col'>Caption</th>
            <th scope='col'>URL</th>
            <th scope='col'>Timestamp</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {
            history ? history.map((item) => (
              <tr>
                <th scope='row'>{item.id}</th>
                <td>{item.caption}</td>
                <td><a href={item.embedLink}>{item.embedLink}</a> </td>
                <td>{item.timestamp}</td>
              </tr>

            )) : "No History Found"
          }

        </MDBTableBody>
      </MDBTable>
    </div>
  )
}

export default Watchhistory