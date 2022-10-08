import classnames from 'classnames';
import { useMemo } from 'react';

import { useCalendarContext } from './CalendarContext';
import { CalendarView } from './types';
import { getDayStart, getNextMonthStart, getPreviousMonthStart } from './utils';

const getMonthViewTitle = (d: Date) => `${d.getFullYear()}년 ${d.getMonth() + 1}월`;
const getWeekViewTitle = (d: Date) =>
  `${d.getFullYear()}년 ${d.getMonth() + 1}월 ~ ${d.getFullYear()}년 ${d.getMonth() + 1}월`;

function CalendarControl() {
  const ctx = useCalendarContext();

  const calendarTitle = useMemo(
    () => (ctx.view === 'month' ? getMonthViewTitle(ctx.date) : getWeekViewTitle(ctx.date)),
    [ctx.view, ctx.date],
  );

  const getControlViewClassName = (view: CalendarView) => {
    const baseClass = 'CalendarControl__view';
    return classnames(baseClass, {
      [`${baseClass}--selected`]: ctx.view === view,
    });
  };

  return (
    <div className="CalendarControl">
      <div className="CalendarControl__left">
        <button className="CalendarControl__today" onClick={() => ctx.setDate(getDayStart(new Date()))}>
          오늘
        </button>
      </div>
      <div className="CalendarControl__center">
        <button className="CalendarControl__prev" onClick={() => ctx.setDate(getPreviousMonthStart(ctx.date))}>
          〈
        </button>
        <span className="CalendarControl__title">{calendarTitle}</span>
        <button className="CalendarControl__next" onClick={() => ctx.setDate(getNextMonthStart(ctx.date))}>
          〉
        </button>
      </div>
      <div className="CalendarControl__right">
        <button className={getControlViewClassName('month')} onClick={() => ctx.setView('month')}>
          월
        </button>
        <button className={getControlViewClassName('week')} onClick={() => ctx.setView('week')}>
          주
        </button>
      </div>
    </div>
  );
}

export default CalendarControl;
