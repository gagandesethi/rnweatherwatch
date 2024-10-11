import getWeatherImage from '../getWeatherImage'; // Adjust the import path as necessary
import { WeatherCode } from '../getWeatherImage'; // Adjust the import path for the WeatherCode type

describe('getWeatherImage', () => {
  it('should return the correct day image URL for valid weather codes', () => {
    const testCases: Array<{ code: WeatherCode; expectedImage: string }> = [
      { code: '0', expectedImage: 'https://openweathermap.org/img/wn/01d@2x.png' },
      { code: '1', expectedImage: 'https://openweathermap.org/img/wn/01d@2x.png' },
      { code: '2', expectedImage: 'https://openweathermap.org/img/wn/02d@2x.png' },
      { code: '3', expectedImage: 'https://openweathermap.org/img/wn/03d@2x.png' },
      { code: '45', expectedImage: 'https://openweathermap.org/img/wn/50d@2x.png' },
      { code: '51', expectedImage: 'https://openweathermap.org/img/wn/09d@2x.png' },
      { code: '71', expectedImage: 'https://openweathermap.org/img/wn/13d@2x.png' },
      { code: '95', expectedImage: 'https://openweathermap.org/img/wn/11d@2x.png' },
    ];

    testCases.forEach(({ code, expectedImage }) => {
      expect(getWeatherImage(code)).toBe(expectedImage);
    });
  });

  it('should return an empty string for an invalid weather code', () => {
    // Testing with an invalid weather code
    expect(getWeatherImage('invalid-code' as WeatherCode)).toBe('');
  });

  it('should return an empty string for a weather code not in the items map', () => {
    // Testing with a code that is not defined in the items
    expect(getWeatherImage('999' as WeatherCode)).toBe('');
  });
});
