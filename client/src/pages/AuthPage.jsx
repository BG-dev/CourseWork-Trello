import React, {useRef} from "react";
import { useFormik } from 'formik'

function AuthPage() {

    const form = useRef();
    const formik = useFormik({
        initialValues: {
            name: '',
            password: '',
        },
        onSubmit: values => {
            console.log(values)
            formik.resetForm();
        }
    })   
    
    

    return(
        <div className="auth">
            <h2>Auth in system</h2>
            <form className="feedback__form" ref={form} onSubmit={formik.handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" onChange={formik.handleChange} value={formik.values.name}/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" onChange={formik.handleChange} value={formik.values.password}/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default AuthPage