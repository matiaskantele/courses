const jwt = require('jsonwebtoken');

const authMiddleware = require('../middleware/auth');

jest.mock('jsonwebtoken');
jwt.verify.mockImplementation(() => ({ userId: 'veryniceid' }));

describe('Auth middleware', () => {
  it('should mark request as authorized if there is a valid token', () => {
    const req = {
      get: name => {
        if (name === 'Authorization')
          return 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ1c2VySWQiOiIxMjM0NTY3ODkwYXNkZmdoamtsIiwiaWF0IjoxNTgyNzAwNjY5LCJleHAiOjE1ODI3MDQyNjl9.9tRjnd0sJI5VeEge0z-7aFT-V-YSawG6pfG1RT-fG90';
        return null;
      },
      userId: null,
      isAuth: null,
    };
    authMiddleware(req, {}, () => {});
    expect(req.isAuth).toBe(true);
    expect(req.userId).toBe('veryniceid');
  });
});
