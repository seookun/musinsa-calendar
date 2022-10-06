import { createContext, useContext } from 'react';

import { CalendarContextType } from './types';

export const CalendarContext = createContext<CalendarContextType>(undefined as any);

export const CalendarProvider = CalendarContext.Provider;
export const CalendarConsumer = CalendarContext.Consumer;

export function useCalendarContext() {
  return useContext<CalendarContextType>(CalendarContext);
}
