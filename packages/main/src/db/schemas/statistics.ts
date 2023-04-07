// 笔记统计信息
const noteStatistics = {
  type: 'object',
  properties: {
    key: {
      type: 'string',
    },
    lastDay: {
      type: 'string', // 上次记录日期
    },
    lastDays: {
      type: 'number', // 持续天数
    },
  },
};

export default noteStatistics;
