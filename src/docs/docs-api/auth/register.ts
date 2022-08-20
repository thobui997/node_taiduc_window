const register = {
  post: {
    tags: ['Auth'],
    description: 'Register an account',
    operationId: 'register',
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/UserRegisterInput',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Account created successfully',
      },
      400: {
        description: 'Bad request',
      },
      500: {
        description: 'Server error',
      },
    },
  },
};

export default register;
