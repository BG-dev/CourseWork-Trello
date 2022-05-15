import {Routes, Route} from 'react-router-dom'
import { AuthPage, RegisterPage, ErrorPage, ProfilePage, HomePage } from '../pages'

export const useRoutes = isAuthenticated => {
    if(isAuthenticated){
        return (
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/profile' element={<ProfilePage/>}/>
                <Route path='*' element={<ErrorPage/>}/>
            </Routes>
        )
    }

    return(
        <Routes>
            <Route path='/' element={<AuthPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
            <Route path='*' element={<AuthPage/>}/>
        </Routes>
    )
}