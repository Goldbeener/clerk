import dayjs from 'dayjs';

export default function useHandleFormatTime(date: Date, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(date).format(format);
}
