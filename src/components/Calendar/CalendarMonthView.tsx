import { useCalendarContext } from './CalendarContext';

function CalendarMonthView() {
  const ctx = useCalendarContext();

  return (
    <div className="CalendarMonthView">
      <div></div>
    </div>
  );
}

export default CalendarMonthView;
