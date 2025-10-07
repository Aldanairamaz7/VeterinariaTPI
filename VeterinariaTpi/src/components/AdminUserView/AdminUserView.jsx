import { useEffect, useState } from "react"

const AdminUserView = () => {
    const [users, setUsers] = useState()

    useEffect(()=>{
        fetch("http://localhost:3000/users")
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));
    },[])
  return (
    <div className="w-100 h-100"></div>
  )
}

export default AdminUserView