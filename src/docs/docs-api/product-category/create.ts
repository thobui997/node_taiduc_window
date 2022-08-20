const create = {
  post: {
    tags: ['Product Category'],
    description: 'Create a new category',
    operationId: 'create-category',
    security: [{ BearerAuth: ['admin'] }],
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/ProductCategoryInput',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Create successfully',
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
export default create;
