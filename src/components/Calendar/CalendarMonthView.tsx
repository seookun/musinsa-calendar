import classnames from 'classnames';
import { modal } from 'components/Modal.tsx';
import { useMemo } from 'react';

import { useCalendarContext } from './CalendarContext';
import CalendarRegister from './CalendarRegister';
import { CalendarEvent, CalendarRegisterPayload, CalendarRegisterProps } from './types';
import { getDate, getDatesInSixWeeks, getDayEnd, getDayStart, isSameDate, isSameMonth } from './utils';

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

  const openRegisterModal = async (props: { date?: Date; event?: CalendarEvent }) => {
    const response = await modal<CalendarRegisterProps, CalendarRegisterPayload>({
      Component: CalendarRegister,
      props: props,
    });

    if (response.result) {
      const { type, event } = response.payload;

      switch (type) {
        case 'create':
          ctx.addEvent(event);
          break;
        case 'update':
          ctx.updateEvent(event);
          break;
        case 'delete':
          ctx.removeEvent(event);
      }
    }
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
          {dayRows[i].map((date) => {
            const isToday = isSameDate(date, todayDate);
            const isOtherMonth = !isSameMonth(date, ctx.date);

            return (
              <div
                key={date.valueOf()}
                className={classnames('CalendarMonthView__day', {
                  'CalendarMonthView__day--today': isToday && !isOtherMonth,
                  'CalendarMonthView__day--otherMonth': isOtherMonth,
                })}
              >
                <div className="CalendarMonthView__day__title">
                  <button tabIndex={isOtherMonth ? -1 : 0} onClick={() => openRegisterModal({ date })}>
                    {getDate(date)}
                  </button>
                </div>
                <div className="CalendarMonthView__day__events">
                  {!isOtherMonth &&
                    getEventsOfDay(date).map((event) => (
                      <button
                        style={{ background: event.color }}
                        key={event.eventKey}
                        onClick={() => openRegisterModal({ event })}
                      >
                        {event.title}
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
