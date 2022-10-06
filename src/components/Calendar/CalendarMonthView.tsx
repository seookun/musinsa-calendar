import classnames from 'classnames';
import { useMemo } from 'react';

import { useCalendarContext } from './CalendarContext';
import { getDate, getDatesInSixWeeks, getDayEnd, getDayStart, isIncludeDate, isSameDate, isSameMonth } from './utils';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function CalendarMonthView() {
  const ctx = useCalendarContext();

  const todayDate = getDayStart(new Date());
  const dayRows = useMemo(() => {
    const datesInSixWeeks = getDatesInSixWeeks(ctx.date);
    return Array.from({ length: 6 }, () => datesInSixWeeks.splice(0, 7));
  }, [ctx.date]);

  const getEventsOfDay = (d: Date) => {
    const dayStart = getDayStart(d);
    const dayEnd = getDayEnd(d);
    return ctx.events.filter((e) => dayEnd >= e.startDate && dayStart <= e.endDate);
  };

  return (
    <div className="CalendarMonthView">
      <div className="CalendarMonthView__daysOfWeek">
        {daysOfWeek.map((dayOfWeek, i) => (
          <div
            key={dayOfWeek}
            className={classnames('CalendarMonthView__dayOfWeek', {
              'CalendarMonthView__dayOfWeek--sunday': i === 0,
              'CalendarMonthView__dayOfWeek--saturday': i === 6,
            })}
          >
            <span>{dayOfWeek}</span>
          </div>
        ))}
      </div>
      {dayRows.map((v, i) => (
        <div key={i} className="CalendarMonthView__dayRow">
          {dayRows[i].map((d) => {
            const isToday = isSameDate(d, todayDate);
            const isOtherMonth = !isSameMonth(d, ctx.date);

            return (
              <div
                key={d.valueOf()}
                className={classnames('CalendarMonthView__day', {
                  'CalendarMonthView__day--today': isToday && !isOtherMonth,
                  'CalendarMonthView__day--otherMonth': isOtherMonth,
                })}
              >
                <div className="CalendarMonthView__day__title">
                  <button tabIndex={isOtherMonth ? -1 : 0}>{getDate(d)}</button>
                </div>
                <div className="CalendarMonthView__day__events">
                  {!isOtherMonth &&
                    getEventsOfDay(d).map((e) => (
                      <button style={{ background: e.color }} key={e.eventKey}>
                        {e.title}
                      </button>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default CalendarMonthView;
