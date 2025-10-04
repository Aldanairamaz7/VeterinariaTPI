
import { useAuth } from '../../Services/authContext/AuthContext'
import { isTokenValid } from './Protected.helpers.js'
import { Navigate, Outlet } from 'react-router'

function Protected() {

    const { token, user, loading } = useAuth()

    if (loading) return <div>Cargando...</div>

    if (!isTokenValid(token)) {
        return <Navigate to='/login' replace />
    }

    return user ? <Outlet /> : <Navigate to='/unauthorized' />
}

export default Protected