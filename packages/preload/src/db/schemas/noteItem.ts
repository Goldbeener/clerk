const noteItemSchema = {
  type: 'object',
  properties: {
    content: {
      type: 'string', // 内容细分？
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

export default noteItemSchema;
