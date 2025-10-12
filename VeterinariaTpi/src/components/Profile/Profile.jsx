import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button } from 'react-bootstrap'
import { useAuth } from '../../Services/authContext/AuthContext'
import { useNavigate } from 'react-router'
import '../Profile/profile.css'

function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleGoToUserPanel = () => {
    navigate('/userpanel');
  }

  return (
    <>
      
      <Button className='h-auto p-2' size='lg' 
        onClick={handleGoToUserPanel} > 
         <FontAwesomeIcon icon={faCircleUser} />
         <br />
        {user?.firstName} {user?.lastName}
      </Button>


    </>
  )
}

export default Profile