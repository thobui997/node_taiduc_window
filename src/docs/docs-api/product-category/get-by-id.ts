const getById = {
  get: {
    tags: ['Product Category'],
    description: 'Get a category',
    operationId: 'get-by-id-category',
    security: [],
    parameters: [
      {
        in: 'path',
        name: 'id',
        required: true,
        schema: {
          type: 'integer',
          minimum: 1,
        },
        description: 'the category id',
      },
    ],
    requestBody: {},
    responses: {
      200: {
        description: 'Get single category successfully',
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
export default getById;
