import { ChangeEvent, useMemo, useState } from 'react';

import { CalendarRegisterProps } from './types';
import { getDayStart, getFormatDate } from './utils';

function CalendarRegister(props: CalendarRegisterProps) {
  const isRegistered = props.event !== undefined;

  const [values, setValues] = useState({
    title: props.event?.title || '',
    startDay: props.event
      ? getFormatDate(props.event.startDate, 'yyyy-MM-dd')
      : getFormatDate(props.date || new Date(), 'yyyy-MM-dd'),
    startTime: props.event
      ? getFormatDate(props.event.startDate, 'hh:mm')
      : getFormatDate(props.date || new Date(), 'hh:mm'),
    endDay: props.event
      ? getFormatDate(props.event.endDate, 'yyyy-MM-dd')
      : getFormatDate(props.date || new Date(), 'yyyy-MM-dd'),
    endTime: props.event
      ? getFormatDate(props.event.endDate, 'hh:mm')
      : getFormatDate(props.date || new Date(), 'hh:mm'),
  });

  const getTitle = () => `일정 ${isRegistered ? '수정하기' : '만들기'}`;

  const timeOptions = useMemo(() => {
    const d1 = getDayStart(new Date());
    const d2 = getDayStart(new Date());

    return Array.from({ length: 48 }, (_, i) => {
      if (i === 24) d2.setHours(0);

      const value = getFormatDate(d1, 'hh:mm');
      const label = `${i < 24 ? 'AM' : 'PM'} ${getFormatDate(d2, 'hh:mm')}`;
      d1.setMinutes(d1.getMinutes() + 30);
      d2.setMinutes(d2.getMinutes() + 30);

      return { value, label };
    });
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValues({
      ...values,
      [e.target.id]: e.target.value,
    });
  };

  const onRemove = () => {
    props.onOk?.({
      type: 'delete',
      event: props.event!,
    });
  };

  const onSave = () => {
    const event = {
      title: values.title,
      startDate: new Date(`${values.startDay} ${values.startTime}`),
      endDate: new Date(`${values.endDay} ${values.endTime}`),
    };

    if (isRegistered) {
      props.onOk?.({
        type: 'update',
        event: {
          ...props.event!,
          ...event,
        },
      });
    } else {
      props.onOk?.({
        type: 'create',
        event,
      });
    }
  };

  return (
    <div className="CalendarRegister">
      <h3 className="CalendarRegister__title">{getTitle()}</h3>
      <div className="row">
        <label htmlFor="title">일정 제목을 입력하세요</label>
        <input id="title" type="text" value={values.title} onChange={onChange} />
      </div>
      <div className="row">
        <div className="col">
          <label htmlFor="startDay">시작 날짜</label>
          <input id="startDay" type="date" value={values.startDay} onChange={onChange} />
        </div>
        <div className="col">
          <label htmlFor="startTime">시작 시간</label>
          <select id="startTime" value={values.startTime} onChange={onChange}>
            {timeOptions.map((time, i) => (
              <option key={i} value={time.value}>
                {time.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label htmlFor="endDay">종료 날짜</label>
          <input id="endDay" type="date" value={values.endDay} onChange={onChange} />
        </div>
        <div className="col">
          <label htmlFor="endTime">종료 시간</label>
          <select id="endTime" value={values.endTime} onChange={onChange}>
            {timeOptions.map((time, i) => (
              <option key={i} value={time.value}>
                {time.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="CalendarRegister__action">
        <button onClick={() => props.onCancel?.()}>취소</button>
        {isRegistered && <button onClick={() => onRemove()}>삭제</button>}
        <button className="CalendarRegister__action__save" onClick={() => onSave()}>
          저장
        </button>
      </div>
    </div>
  );
}

export default CalendarRegister;
