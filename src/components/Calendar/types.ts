export type CalendarStorage = WindowLocalStorage | WindowSessionStorage;
export type CalendarView = 'month' | 'week';

export interface CalendarEvent {
  eventKey: string;
  color: string;
  title: string;
  startDate: Date;
  endDate: Date;
}

export interface CalendarProps {
  storage?: CalendarStorage;
  storageKey?: string;
  initialDate?: Date;
  initialView?: CalendarView;
}

export interface CalendarState {
  storage?: CalendarStorage;
  storageKey?: string;
  date: Date;
  view: CalendarView;
  events: CalendarEvent[];
}

export interface CalendarContextType extends CalendarState {
  setDate: (date: Date) => void;
  setView: (view: CalendarView) => void;
  addEvent: (event: Omit<CalendarEvent, 'eventKey' | 'color'>) => void;
  removeEvent: (event: CalendarEvent) => void;
  updateEvent: (event: CalendarEvent) => void;
}
