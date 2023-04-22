import React from 'react';
import { Link } from 'react-router-dom';
import NavbarOne from '../pages/NavbarOne';
import DisplayEvents from './DisplayEvents';
import { Button } from 'react-bootstrap';

function Dashboard() {
  return (
    <div>
      <NavbarOne />
      <div className='text-center'>
        <Link to="/Calendar">
        <Button style={{ backgroundColor: 'skyblue' }}><i className='fa fa-plu'></i>𝐁𝐨𝐨𝐤 𝐘𝐨𝐮𝐫 𝐑𝐨𝐨𝐦</Button>
        </Link>

        <DisplayEvents />

    </div>
    </div>
    
  )
}

export default Dashboard