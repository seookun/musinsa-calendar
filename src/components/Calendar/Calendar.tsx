import { useReducer } from 'react';
import { v4 as uuid } from 'uuid';

import { CalendarProvider } from './CalendarContext';
import CalendarControl from './CalendarControl';
import CalendarMonthView from './CalendarMonthView';
import CalendarWeekView from './CalendarWeekView';
import { CalendarContextType, CalendarEvent, CalendarProps, CalendarState, CalendarView } from './types';
import { getCompareDate, getDayStart } from './utils';

type CalendarAction =
  | { type: 'SET_DATE'; payload: Date }
  | { type: 'SET_VIEW'; payload: CalendarView }
  | { type: 'ADD_EVENT'; payload: CalendarEvent }
  | { type: 'REMOVE_EVENT'; payload: CalendarEvent }
  | { type: 'UPDATE_EVENT'; payload: CalendarEvent };

function calendarReducer(state: CalendarState, action: CalendarAction): CalendarState {
  const { type, payload } = action;

  switch (type) {
    case 'SET_DATE':
      return { ...state, date: payload };
    case 'SET_VIEW':
      return { ...state, view: payload };
    case 'ADD_EVENT': {
      const events = [...state.events, payload].sort((a, b) => {
        const x = getCompareDate(a.startDate, b.startDate);
        return x === 0 ? getCompareDate(a.endDate, b.endDate) : x;
      });
      return { ...state, events };
    }
    case 'REMOVE_EVENT': {
      const index = state.events.findIndex((e) => e.eventKey === payload.eventKey);
      if (index > -1) {
        state.events.splice(index, 1);
        return { ...state, events: [...state.events] };
      }
      return state;
    }
    case 'UPDATE_EVENT': {
      const event = state.events.find((e) => e.eventKey === payload.eventKey);
      if (event) {
        Object.assign(event, payload);
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
    date: getDayStart(props.initialDate || new Date()),
    view: props.initialView || 'month',
    events: [],
  });

  const setDate = (date: Date) => {
    dispatch({ type: 'SET_DATE', payload: date });
  };

  const setView = (view: CalendarView) => {
    dispatch({ type: 'SET_VIEW', payload: view });
  };

  const addEvent = (event: Omit<CalendarEvent, 'eventKey' | 'color'>) => {
    dispatch({
      type: 'ADD_EVENT',
      payload: {
        eventKey: uuid(),
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        ...event,
      },
    });
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
