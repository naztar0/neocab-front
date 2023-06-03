import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { shiftCoefficient } from '@/constants/schedule';
import './index.scss';

export default function Cells() {
  const calendarStartHour = useSelector((state: any) => state.scheduleReducer.calendarStartHour);
  const calendarEndHour = useSelector((state: any) => state.scheduleReducer.calendarEndHour);

  useEffect(() => {
    const updateTimeline = () => {
      const now = new Date();
      const timeline = document.getElementById('timeline');
      if (!timeline) {
        return;
      }
      if (now.getHours() < calendarStartHour || now.getHours() >= calendarEndHour) {
        timeline.style.display = 'none';
        return;
      }
      const nowMinutes = now.getHours() * 60 + now.getMinutes();
      const timelineTop = (nowMinutes - calendarStartHour * 60) * shiftCoefficient;
      timeline.style.top = `${timelineTop}px`;
      timeline.style.display = 'block';
    };
    setInterval(updateTimeline, 1000);
  }, []);

  return <div id="timeline" />;
}
