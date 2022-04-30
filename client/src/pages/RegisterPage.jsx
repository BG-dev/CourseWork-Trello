import React, {useRef} from "react";
import { useFormik } from 'formik'
import { useHttp } from "../hooks/http.hook";

function RegisterPage() {

    const { loading, request } = useHttp()

    const form = useRef();
    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
            passwordRepeat: ''
        },
        onSubmit: values => {
            registerHandler(values)
            formik.resetForm();
        }
    })   
    
    const registerHandler = async (values) => {
        try {
            const data = await request('/api/auth/register', 'POST', {...values})
            console.log(data)
        } catch (error) {
            
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
                <button type="submit" disabled={loading}>Register</button>
            </form>
        </div>
    )
}

export default RegisterPage