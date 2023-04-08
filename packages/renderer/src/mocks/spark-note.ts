import * as Mock from 'mockjs';

const Random = Mock.Random;
const data = Mock.mock({
  'array|1-10': [
    {
      content: '@csentence(5)',
      id: Random.id(),
      time: Random.datetime(),
    },
    {
      content: '@csentence(9)',
      id: Random.id(),
      time: Random.datetime(),
    },
  ],
});
export default data;
