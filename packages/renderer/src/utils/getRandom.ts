export const getRandom = (function () {
  let seed = Date.now();
  function rnd() {
    seed = (seed * 9301 + 49297) % 233280; //为何使用这三个数?
    return seed / 233280.0;
  }
  return function rand(num: number) {
    return Math.ceil(rnd() * num);
  };
})();
