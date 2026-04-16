import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  format,
} from 'date-fns';

/**
 * Get the start of the week (Monday) for a given date
 */
export const getWeekStart = (date) => {
  return startOfWeek(date, { weekStartsOn: 1 }); // 1 = Monday
};

/**
 * Get the end of the week (Sunday) for a given date
 */
export const getWeekEnd = (date) => {
  return endOfWeek(date, { weekStartsOn: 1 }); // 1 = Monday
};

/**
 * Get an array of all 7 days in the week for a given date
 */
export const getWeekDays = (date) => {
  const start = getWeekStart(date);
  const end = getWeekEnd(date);

  return eachDayOfInterval({ start, end });
};

/**
 * Check if a date is today
 */
export const isToday = (date) => {
  return isSameDay(date, new Date());
};

/**
 * Format a date for display
 */
export const formatDate = (date, formatString) => {
  return format(date, formatString);
};

/**
 * Get the current week (Monday to Sunday)
 */
export const getCurrentWeek = () => {
  const today = new Date();
  return {
    start: getWeekStart(today),
    end: getWeekEnd(today),
  };
};
