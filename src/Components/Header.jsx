import React from 'react'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand
} from 'mdb-react-ui-kit';


function Header() {
    return (
        <div>
            <MDBNavbar light bgColor='dark'>
                <MDBContainer fluid>
                    <MDBNavbarBrand style={{color:'Highlight'}} href='/'>
                    <i class="fa-solid fa-play me-2" style={{color:'#0f67ff;'}}></i>
                        Media Player
                    </MDBNavbarBrand>
                </MDBContainer>
            </MDBNavbar>
        </div>
    )
}

export default Header