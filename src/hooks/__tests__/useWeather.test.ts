import { renderHook, act } from '@testing-library/react-hooks';
import useWeather from '../useWeather'; // Adjust the path as needed
import { getLocationCoordinates, getWeatherForecast } from '../../api/weatherApi/weatherApi';

// Mock the weatherApi functions
jest.mock('../../api/weatherApi/weatherApi', () => ({
  getLocationCoordinates: jest.fn(),
  getWeatherForecast: jest.fn(),
}));

describe('useWeather hook', () => {
  const mockLocation = 'London';
  const mockCoordinates = [{ latitude: 51.5074, longitude: -0.1278, name: 'London' }];
  const mockWeatherData = {
    daily: {
      temperature_2m_max: [15, 16, 17],
      temperature_2m_min: [10, 11, 12],
      weathercode: [0, 1, 2],
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch weather data for a valid location', async () => {
    getLocationCoordinates.mockResolvedValue(mockCoordinates);
    getWeatherForecast.mockResolvedValue(mockWeatherData);

    const { result, waitForNextUpdate } = renderHook(() => useWeather(mockLocation));

    await act(async () => {
      result.current.fetchWeather();
      await waitForNextUpdate();
    });

    expect(getLocationCoordinates).toHaveBeenCalledWith(mockLocation);
    expect(getWeatherForecast).toHaveBeenCalledWith(51.5074, -0.1278);
    expect(result.current.weatherData).toEqual(mockWeatherData);
    expect(result.current.selectedLocation).toBe('London');
  });

  test('should handle location selection and close modal', async () => {
    getWeatherForecast.mockResolvedValue(mockWeatherData);

    const { result, waitForNextUpdate } = renderHook(() => useWeather(mockLocation));

    await act(async () => {
      result.current.handleLocationSelect(mockCoordinates[0]);
      await waitForNextUpdate();
    });

    expect(getWeatherForecast).toHaveBeenCalledWith(51.5074, -0.1278);
    expect(result.current.weatherData).toEqual(mockWeatherData);
    expect(result.current.selectedLocation).toBe('London');
    expect(result.current.modalOpen).toBe(false); // Ensure modal is closed
  });

  test('should handle errors gracefully', async () => {
    getLocationCoordinates.mockRejectedValue(new Error('Error fetching location data'));

    const { result, waitForNextUpdate } = renderHook(() => useWeather(mockLocation));

    await act(async () => {
      result.current.fetchWeather();
      await waitForNextUpdate();
    });

    expect(result.current.error).toBe('Error fetching weather data');
  });
});
