const getAll = {
  get: {
    tags: ['Product Category'],
    description: 'Get all categories',
    operationId: 'get-all-category',
    security: [],
    parameters: [],
    requestBody: {},
    responses: {
      200: {
        description: 'Get all successfully',
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
export default getAll;
