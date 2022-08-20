const login = {
  post: {
    tags: ['Auth'],
    description: 'Login by account',
    operationId: 'login',
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/UserLoginInput',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Login successfully',
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

export default login;
