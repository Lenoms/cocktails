import React from 'react'
import './Navbar.css'
import ListAltIcon from '@mui/icons-material/ListAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className='nav-bar'>
      <div className='nav-buttons'>
        <button className='nav-button' onClick={()=>navigate("/untried")}><CheckCircleIcon/></button>
        <button className='nav-button' onClick={()=>navigate("/tried")}><ListAltIcon/></button>
      </div>
    </div>
  )
}

export default Navbar