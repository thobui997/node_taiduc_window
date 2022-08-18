export const logout = {
  post: {
    tags: ['Auth'],
    description: 'Logout user',
    operationId: 'logout',
    parameters: [],
    requestBody: {},
    responses: {
      204: {
        description: 'Logout successfully',
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
