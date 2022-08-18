export const refresh = {
  post: {
    tags: ['Auth'],
    description: 'Create a new access token when token expired',
    operationId: 'refresh',
    parameters: [],
    requestBody: {},
    responses: {
      200: {
        description: 'Successfully',
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
