import { useReducer } from 'react';

import { CalendarProvider } from './CalendarContext';
import CalendarControl from './CalendarControl';
import CalendarMonthView from './CalendarMonthView';
import CalendarWeekView from './CalendarWeekView';
import { CalendarContextType, CalendarEvent, CalendarProps, CalendarState, CalendarView } from './types';

type CalendarAction =
  | { type: 'SET_DATE'; payload: Date }
  | { type: 'SET_VIEW'; payload: CalendarView }
  | { type: 'ADD_EVENT'; payload: Omit<CalendarEvent, 'color'> }
  | { type: 'REMOVE_EVENT'; payload: CalendarEvent }
  | { type: 'UPDATE_EVENT'; payload: CalendarEvent };

function calendarReducer(state: CalendarState, action: CalendarAction): CalendarState {
  switch (action.type) {
    case 'SET_DATE':
      return { ...state, date: action.payload };
    case 'SET_VIEW':
      return { ...state, view: action.payload };
    case 'ADD_EVENT': {
      const color = Math.floor(Math.random() * 16777215).toString(16);
      const event = { color, ...action.payload };
      return { ...state, events: [...state.events, event] };
    }
    case 'REMOVE_EVENT': {
      const index = state.events.findIndex((e) => e.color === action.payload.color);
      if (index > -1) {
        state.events.splice(index, 1);
        return { ...state, events: [...state.events] };
      }
      return state;
    }
    case 'UPDATE_EVENT': {
      const event = state.events.find((e) => e.color === action.payload.color);
      if (event) {
        Object.assign(event, action.payload);
        return { ...state, events: [...state.events] };
      }
      return state;
    }
  }
}

function useCalendar(props: CalendarProps): CalendarContextType {
  const [state, dispatch] = useReducer(calendarReducer, {
    storage: props.storage,
    storageKey: props.storageKey,
    date: props.initialDate || new Date(),
    view: props.initialView || 'month',
    events: [],
  });

  const setDate = (date: Date) => {
    dispatch({ type: 'SET_DATE', payload: date });
  };

  const setView = (view: CalendarView) => {
    dispatch({ type: 'SET_VIEW', payload: view });
  };

  const addEvent = (event: Omit<CalendarEvent, 'color'>) => {
    dispatch({ type: 'ADD_EVENT', payload: event });
  };

  const removeEvent = (event: CalendarEvent) => {
    dispatch({ type: 'REMOVE_EVENT', payload: event });
  };

  const updateEvent = (event: CalendarEvent) => {
    dispatch({ type: 'UPDATE_EVENT', payload: event });
  };

  return {
    ...state,
    setDate,
    setView,
    addEvent,
    removeEvent,
    updateEvent,
  };
}

function Calendar(props: CalendarProps = {}) {
  const ctx = useCalendar(props);

  return (
    <CalendarProvider value={ctx}>
      <div className="Calendar">
        <CalendarControl />
        {ctx.view === 'month' ? <CalendarMonthView /> : <CalendarWeekView />}
      </div>
    </CalendarProvider>
  );
}

export default Calendar;
