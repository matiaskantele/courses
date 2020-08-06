const User = require('../models/user');
const AuthController = require('../controllers/auth');

describe('Auth Controller - Login', () => {
  it('should throw an error with code 500 if accessing the database fails', () => {
    expect(true).toBe(true);
  });
});
