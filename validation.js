const joi = require("joi");

const registerValidate = (data) => {
    let Schema = joi.object({
        name: joi.string().required().min(2),
        email: joi.string().email().required(),
        password: joi.string().required().min(5).max(10),
        age: joi.number().required().min(16),
        education: joi.string().required(),
        address: joi.string().required(),
        mobile: joi.number().integer().required().min(1000000000).max(9999999999)
    })
    return Schema.validate(data);
}

const loginValidate = (data) => {
    let Schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required().min(5).max(10)
    })
    return Schema.validate(data);
}
module.exports.registerValidate = registerValidate;
module.exports.loginValidate = loginValidate;