declare module '*.vue' {
  import type {DefineComponent} from 'vue';
  // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

type NoteItem = {
  [key: string]: string;
};
declare module '@mock/*' {
  const data: {array: NoteItem[]};
  export default data;
}

declare global {
  interface Window {
    todoDb: any;
  }
}
