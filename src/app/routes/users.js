const loginValidation = require('../validation/loginValidation');
const signUpValidation = require('../validation/signUpValidation');

module.exports = app => {
  const users = require('../controller/users.js');
  // Create a new User
  app.post('/users/signup', signUpValidation, users.create);

  // Retrieve all user
  app.get('/users', users.findAll);

  // Retrieve a single User with login
  app.post('/users/signin', loginValidation, users.findOneLogin);

  // Retrieve a single User with UserId
  app.get('/users/:userId', users.getByUserId);

 // Update a user with userId
  app.patch('/users/:userId', users.update);

}
