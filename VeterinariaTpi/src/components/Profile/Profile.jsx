import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button } from 'react-bootstrap'
import { useAuth } from '../../Services/authContext/AuthContext'
import { useNavigate } from 'react-router'

function Profile() {
    const {user} = useAuth();
    const navigate = useNavigate();
    const handleGoToUserPanel = () => {
        navigate('/userpanel');
    } 

  return (
    <> 
        <Button onClick={handleGoToUserPanel} >
            <FontAwesomeIcon icon={faUser} />
            <br/>
            {user?.firstName} {user?.lastName}

        </Button>
    
    
    </>
  )
}

export default Profile