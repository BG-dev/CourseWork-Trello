import React, {useEffect, useRef} from "react";
import { useFormik } from 'formik'
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook"
import { useNavigate, NavLink } from "react-router-dom"
import { validateNewUser } from "../validators/userValidator"

function RegisterPage() {

    const message = useMessage()
    const { loading, request, error, clearError } = useHttp()
    const navigate = useNavigate()

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const form = useRef();
    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
            passwordRepeat: ''
        },
        validationSchema: form => 
            validateNewUser(form.values),
        onSubmit: values => {
            registerHandler(values)
            formik.resetForm();
        }
    })   
    
    const registerHandler = async (values) => {
        try {
            console.log(formik)
            const data = await request('/api/auth/register', 'POST', {...values})
            message(data.message)
            navigate('/')
        } catch (error) {
            message(error.message)
        }
    }

    return(
        <div className="register">
            <h2>Register in system</h2>
            <form className="feedback__form" ref={form} onSubmit={formik.handleSubmit}>
                <label htmlFor="login">Login</label>
                <input type="text" id="login" name="login" onChange={formik.handleChange} value={formik.values.login}/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" onChange={formik.handleChange} value={formik.values.password}/>
                <label htmlFor="passwordRepeat">Repeat password</label>
                <input type="password" id="passwordRepeat" name="passwordRepeat" onChange={formik.handleChange} value={formik.values.passwordRepeat}/>
                <div className="row">
                    <button className="btn waves-effect waves-light col" type="submit" disabled={loading} name="action">Register</button>
                    <NavLink to="/login" className="waves-effect waves-light btn col offset-s1">Login</NavLink>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage