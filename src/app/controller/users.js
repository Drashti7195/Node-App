const Login = require('../models/login.js');
const User = require('../models/signUp.js');

// Create and Save a new Note
exports.findOneLogin = (req, res) => {
  console.log('call login method...', req.body);
  Login.find({ login: req.body.login })
    .then(user => {
      console.log("user response::",user)
      if (user.length === 0) {
        return res.status(404).send({
          message: req.body.login + ' User is not Available ' ,
        });
      }
      console.log("check condition::",user[0].password !== req.body.password,"user.password",user[0].password)
      if (user[0].password !== req.body.password) {
        return res.status(404).send({
          message: 'Password is Wrong ' + req.body.login,
        });
      }
      res.send(user);
    })
    .catch(err => {
      return res.status(500).send({
        message: 'Error retrieving user with login ' + req.body.login,
      });
    });
};
exports.create = (req, res) => {
  console.log('Calling SignUp req:::', req, 'req.body', req.body);
  if (!req.body.full_name) {
    return res.status(400).send({
      message: "BAD Request Data isn't available",
    });
  }
  User.find({ login: req.body.login }).then(userDoc => {
    console.log('userDoc in findQuery', userDoc);
    if (userDoc.length === 1) {
      return res.status(400).send({
        message: 'This Login Name Already In Use',
      });
    }

    // Create a user
    const user = new User({
      full_name: req.body.full_name,
      email: req.body.email,
      login: req.body.login,
      password: req.body.password,
      mobile: req.body.mobile,
      country: req.body.country,
      profileUrl: req.body.profileUrl,
    });

    // Save user in the database
    user
      .save()
      .then(data => {
        res.send(data);
        console.log('save data::', data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || 'Some error occurred while creating the users.',
        });
      });
  });
};

exports.findAll = (req, res) => {
  User.find()
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving users.',
      });
    });
};

exports.update = (req, res) => {
  console.log('req:::', req, 'req.body', req.body);
  if (!req.body.full_name) {
    return res.status(400).send({
      message: "BAD Request Data isn't available",
    });
  }

  User.findByIdAndUpdate(
    req.params.userId,
    {
      full_name: req.body.full_name,
      email: req.body.email,
      login: req.body.login,
      password: req.body.password,
      mobile: req.body.mobile,
      country: req.body.country,
      profileUrl: req.body.profileUrl,
    },
    { new: true }
  )

    .then(user => {
      console.log('Update Successfully User', user);
      if (!user) {
        return res.status(404).send({
          message: 'update not found with id ' + req.params.userId,
        });
      }
      res.send(user);
    })
    .catch(err => {
      console.log('err updateUser', err);
      return res.status(500).send({
        message: 'Error updating user with id ' + req.params.userId,
      });
    });
};

exports.getByUserId = (req, res) => {
  console.log('req:::findOne', req, req.params.userId);
  User.findById(req.params.userId)
    .then(user => {
      console.log('user data', user);
      if (!user) {
        return res.status(404).send({
          message: 'user not found with id ' + req.params.userId,
        });
      }
      res.send(user);
    })
    .catch(err => {
      return res.status(500).send({
        message: 'Error retrieving user with id ' + req.params.userId,
      });
    });
};
