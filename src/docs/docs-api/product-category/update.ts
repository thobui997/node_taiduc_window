const update = {
  put: {
    tags: ['Product Category'],
    description: 'Update a category',
    operationId: 'update category',
    security: [{ BearerAuth: ['admin'] }],
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
        description: 'Update successfully',
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
export default update;
