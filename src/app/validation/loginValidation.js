const joi = require("joi");


const errorFunction = (errorBit, msg, data) => {
    if (errorBit) return { is_error: errorBit, message: msg };
    else return { is_error: errorBit, message: msg, data };
};

const loginValidation = async (req, res, next) => {
	console.log("req in loginValidation ",req);
    const payload = {
		login: req.body.login,
		password: req.body.password,
	};
     console.log("payload:::",payload);
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
     login: joi.string().alphanum().min(3).max(25).trim(true).required(),
     password: joi.string().min(8).trim(true).required(),
});


module.exports  = loginValidation;