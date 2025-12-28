import { format, parse, subDays, addDays } from 'date-fns';

export function formatDate(date: Date, formatString: string = 'yyyy-MM-DD'): string {
  return format(date, formatString);
}

export function formatDisplayDate(dateString: string): string {
  const date = parse(dateString, 'yyyy-MM-dd', new Date());
  return format(date, 'EEEE, MMM d');
}

export function formatTime(timestamp: number): string {
  return format(new Date(timestamp), 'h:mm a');
}

export function getTodayString(): string {
  return formatDate(new Date(), 'yyyy-MM-dd');
}

export function getYesterdayString(currentDate: string): string {
  const date = parse(currentDate, 'yyyy-MM-dd', new Date());
  return formatDate(subDays(date, 1), 'yyyy-MM-dd');
}

export function getTomorrowString(currentDate: string): string {
  const date = parse(currentDate, 'yyyy-MM-dd', new Date());
  return formatDate(addDays(date, 1), 'yyyy-MM-dd');
}

export function isToday(dateString: string): boolean {
  return dateString === getTodayString();
}
