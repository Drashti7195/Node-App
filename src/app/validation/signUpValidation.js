const joi = require("joi");


const errorFunction = (errorBit, msg, data) => {
    if (errorBit) return { is_error: errorBit, message: msg };
    else return { is_error: errorBit, message: msg, data };
};

const signUpValidation = async (req, res, next) => {
	
    const payload = {
		full_name: req.body.full_name,
		email: req.body.email,
        login: req.body.login,
        password:req.body.password,
        mobile:req.body.mobile,
        country:req.body.country
	};

	const { error } = validation.validate(payload)
	if (error) {
		res.status(406);
		return res.json(
			errorFunction(true, `Error in User Data : ${error.message}`)
		);
	} else {
		next();
	}
};

const validation = joi.object({
     full_name: joi.string().min(3).max(25).trim(true).required(),
     login: joi.string().alphanum().min(3).max(25).trim(true).required(),
     password: joi.string().min(8).trim(true).required(),
     email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).trim(true).required(),
     mobile: joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required(),
     country:joi.string().alphanum().min(3).max(10).trim(true).required(),
});

module.exports  = signUpValidation;