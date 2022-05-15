import { useCallback } from "react"
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/actions/user';

const storageName = 'userData'

export const useAuth = () => {
    const dispatch = useDispatch();

    const login = useCallback((jwtToken, userLogin, id) => {
        const user = {
            userId: id,
            token: jwtToken,
            login: userLogin
        }
        dispatch(setUser(user))
        localStorage.setItem(storageName, JSON.stringify(user))
    }, [dispatch])

    const logout = useCallback(() => {
        dispatch(setUser({
            token: null,
            userId: null,
            login: null
        }))
        localStorage.removeItem(storageName)
    }, [dispatch])

    return { login, logout, storageName }
}