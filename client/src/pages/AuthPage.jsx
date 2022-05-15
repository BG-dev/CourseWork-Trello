import React, {useRef, useEffect} from "react";
import { useFormik } from 'formik'
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook"
import { useAuth } from "../hooks/auth.hook.js";
import { useDispatch } from "react-redux"
import { setUser } from '../redux/actions/user'
import { NavLink, useNavigate } from "react-router-dom"

function AuthPage() {

    const message = useMessage()
    const navigate = useNavigate();
    const { loading, request, error, clearError } = useHttp()
    const { login } = useAuth()
    const dispatch = useDispatch();

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const form = useRef();
    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
        },
        onSubmit: values => {
            loginHandler(values)
            formik.resetForm();
        }
    })   
    
    const loginHandler = async (values) => {
        try {
            if(!values.login || !values.password)
                throw new Error("Login or password is empty")
            const data = await request('/api/auth/login', 'POST', {...values})
            login(data.token, data.login, data.userId)
            dispatch(setUser({ 
                token: data.token, 
                userId: data.userId,
                login: data.login
            }))
            
            message(data.message)
            navigate('/profile')
        } catch (error) {
            // console.log(error.message)
        }
    }

    return(
        <div className="auth">
            <h2>Auth in system</h2>
            <form className="feedback__form" ref={form} onSubmit={formik.handleSubmit}>
                <label htmlFor="login">Login</label>
                <input type="text" id="login" name="login" onChange={formik.handleChange} value={formik.values.login}/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" onChange={formik.handleChange} value={formik.values.password}/>
                <div className="row">
                    <button className="btn waves-effect waves-light col" type="submit" disabled={loading} name="action">Login</button>
                    <NavLink to="/register" className="waves-effect waves-light btn col offset-s1">Create new user</NavLink>
                </div>
            </form>
        </div>
    )
}

export default AuthPage