export const components = {
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        description:
          'Bearer authentication (also called token authentication) is an HTTP authentication scheme that involves security tokens called bearer tokens. The name “Bearer authentication” can be understood as “give access to the bearer of this token.”',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'User identification number',
            example: '36es12resfmfdfd',
            readOnly: true,
          },
          username: {
            type: 'string',
            description: `User's username`,
            example: 'nobita123',
          },
          password: {
            type: 'string',
            description: `User's password`,
            writeOnly: true,
          },
        },
      },
      UserRegisterInput: {
        type: 'object',
        required: ['username', 'password', 'confirmPassword'],
        properties: {
          username: {
            type: 'string',
            description: `User's username`,
            example: 'nobita123',
          },
          password: {
            type: 'string',
            minLength: 6,
            description: `User's password`,
          },
          confirmPassword: {
            type: 'string',
            minLength: 6,
          },
        },
      },
      UserLoginInput: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
          username: {
            type: 'string',
            description: `User's username`,
            example: 'nobita123',
          },
          password: {
            type: 'string',
            minLength: 6,
            format: 'password',
            description: `User's password`,
          },
        },
      },
      ProductCategoryInput: {
        type: 'object',
        required: ['name'],
        properties: {
          name: {
            type: 'string',
            minLength: 4,
            maxLength: 50,
            description: 'name of category',
            example: 'laptop',
          },
        },
      },
    },
  },
};
