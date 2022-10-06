import { useCalendarContext } from './CalendarContext';

function CalendarWeekView() {
  const ctx = useCalendarContext();

  return (
    <div className="CalendarWeekView">
      <div>{ctx.view}</div>
    </div>
  );
}

export default CalendarWeekView;
