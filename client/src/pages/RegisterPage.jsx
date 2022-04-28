import React, {useRef} from "react";
import { useFormik } from 'formik'

function RegisterPage() {

    const form = useRef();
    const formik = useFormik({
        initialValues: {
            name: '',
            password: '',
            passwordRepeat: ''
        },
        onSubmit: values => {
            console.log(values)
            formik.resetForm();
        }
    })   
    
    

    return(
        <div className="register">
            <h2>Register in system</h2>
            <form className="feedback__form" ref={form} onSubmit={formik.handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" onChange={formik.handleChange} value={formik.values.name}/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" onChange={formik.handleChange} value={formik.values.password}/>
                <label htmlFor="password-repeat">Repeat password</label>
                <input type="password" id="password-repeat" name="password-repeat" onChange={formik.handleChange} value={formik.values.passwordRepeat}/>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default RegisterPage