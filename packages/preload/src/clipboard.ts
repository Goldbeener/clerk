import {clipboard} from 'electron';

export function clipboardWriteText(text: string): void {
  clipboard.writeText(text);
}
export function clipboardReadText(): string {
  return clipboard.readText();
}
