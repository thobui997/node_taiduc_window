export const components = {
  components: {
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
            description: `User's password`,
          },
          confirmPassword: {
            type: 'string',
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
            description: `User's password`,
          },
        },
      },
    },
  },
};
