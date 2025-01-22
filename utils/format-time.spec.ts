import { formatTime } from './format-time';

describe('formatTime', () => {
  test('should format time in seconds correctly', () => {
    expect(formatTime(5000)).toBe('00:05'); // 5 seconds
    expect(formatTime(65000)).toBe('01:05'); // 65 seconds (1 min, 5 sec)
  });

  test('should format time with hours, minutes, and seconds', () => {
    expect(formatTime(3600000)).toBe('01:00:00'); // 1 hour
    expect(formatTime(3661000)).toBe('01:01:01'); // 1 hour, 1 minute, 1 second
  });

  test('should handle times less than one minute', () => {
    expect(formatTime(1000)).toBe('00:01'); // 1 second
    expect(formatTime(59000)).toBe('00:59'); // 59 seconds
  });

  test('should handle times less than one second', () => {
    expect(formatTime(0)).toBe('00:00'); // 0 milliseconds
    expect(formatTime(999)).toBe('00:00'); // 999 milliseconds
  });

  test('should pad single-digit minutes and seconds with zeros', () => {
    expect(formatTime(61000)).toBe('01:01'); // 1 minute, 1 second
    expect(formatTime(3661000)).toBe('01:01:01'); // 1 hour, 1 minute, 1 second
  });

  test('should handle large times with multiple hours', () => {
    expect(formatTime(7322000)).toBe('02:02:02'); // 2 hours, 2 minutes, 2 seconds
    expect(formatTime(86400000)).toBe('24:00:00'); // 24 hours
  });

  test('should correctly omit hours when not necessary', () => {
    expect(formatTime(120000)).toBe('02:00'); // 2 minutes
    expect(formatTime(3599000)).toBe('59:59'); // 59 minutes, 59 seconds
  });
});