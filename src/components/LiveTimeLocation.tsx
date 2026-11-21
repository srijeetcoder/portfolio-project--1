import { useEffect, useState } from 'react';
import { MapPin, Clock } from 'lucide-react';

export function LiveTimeLocation() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setTime(now.toLocaleTimeString('en-GB', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="live-time-location" aria-live="polite">
      <div className="time-row">
        <Clock size={14} strokeWidth={1.5} aria-hidden="true" />
        <span className="time-value">{time}</span>
      </div>
      <div className="location-row">
        <MapPin size={14} strokeWidth={1.5} aria-hidden="true" />
        <span className="location-value">India</span>
      </div>
    </div>
  );
}