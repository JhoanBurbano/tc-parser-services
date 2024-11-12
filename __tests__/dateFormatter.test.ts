import { formatToDDMMYYYY } from '../src/utils/dateFormatter';

describe('formatToDDMMYYYY', () => {
  it('should format date correctly', () => {
    const date = '2024/11/10';
    const formatted = formatToDDMMYYYY(date);
    expect(formatted).toBe('10-11-2024');
  });

  it('should throw error for invalid date format', () => {
    const invalidDate = '10-11-2024';
    expect(() => formatToDDMMYYYY(invalidDate)).toThrow();
  });
});
