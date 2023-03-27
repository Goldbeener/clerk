
interface RandomIns  {
  sentence: (min:number, max:number) => string,
  csentence: (min:number, max:number) => string[],
  id: () => string,
  datetime: () => string,
  [key: string]: () => string
}

declare module 'mockjs' {
  const Random: RandomIns;
  const mock: (any) => any[];
  modulex.export = { Random, mock };
}

