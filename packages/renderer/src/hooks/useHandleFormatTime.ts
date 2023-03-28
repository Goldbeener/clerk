import dayjs from 'dayjs';

export function useHandleFormatTime(date: Date, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(date).format(format);
}

export function getDay(date: Date) {
  return dayjs(date).day();
}
