const todoItemSchema = {
  type: 'object',
  properties: {
    content: {
      type: 'string',
    },
    tags: {
      type: 'array',
    },
    timestamp: {
      type: 'number',
    },
  },
  required: ['content'],
};

/**
 * 设计合理的协议
 */

export default todoItemSchema;
