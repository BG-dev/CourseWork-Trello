const Joi = require("joi");

const validateUser = userData => {
    const schema = Joi.object({
        login: Joi.string().alphanum().min(3).required().label("Login"),
        password: Joi.string().min(8).required().label("Password")
    })
    return schema.validate(userData)
}

const validateNewUser = newUserData => {
    const schema = Joi.object({
        login: Joi.string().alphanum().min(3).required().label("Login"),
        password: Joi.string().min(8).required().label("Password"),
        repeatedPassword: Joi.string().min(8).required().valid(Joi.ref("password")).label("Password confirmation")
    })
    return schema.validate(newUserData)
}

export { validateUser, validateNewUser }
