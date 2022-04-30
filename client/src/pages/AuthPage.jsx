import React, {useRef} from "react";
import { useFormik } from 'formik'
import { useHttp } from "../hooks/http.hook";

function AuthPage() {

    const { loading, request } = useHttp()

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
            const data = await request('/api/auth/login', 'POST', {...values})
            console.log(data)
        } catch (error) {
            
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
                <button type="submit" disabled={loading}>Login</button>
            </form>
        </div>
    )
}

export default AuthPage