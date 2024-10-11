import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../App';
import { getLocationCoordinates, getWeatherForecast } from '../src/api/weatherApi/weatherApi';
import getWeatherImage from '../src/helpers/getWeatherImage';

jest.mock('../src/api/weatherApi/weatherApi', () => ({
  getLocationCoordinates: jest.fn(),
  getWeatherForecast: jest.fn(),
}));

jest.mock('../src/helpers/getWeatherImage');

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render input and button', () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    expect(getByPlaceholderText('Enter Location')).toBeTruthy();
    expect(getByText('Get Weather')).toBeTruthy();
  });

  it('should fetch weather data on button press', async () => {
    const mockLocations = [{ id: 1, name: 'Location 1', latitude: 1, longitude: 1 }];
    const mockForecast = {
      daily: {
        temperature_2m_max: [20, 22, 21],
        weathercode: ['0'],
      },
    };
    
    (getLocationCoordinates as jest.Mock).mockResolvedValue(mockLocations);
    (getWeatherForecast as jest.Mock).mockResolvedValue(mockForecast);
    (getWeatherImage as jest.Mock).mockReturnValue('https://example.com/weather-image.png');

    const { getByPlaceholderText, getByText, findByText } = render(<App />);
    
    fireEvent.changeText(getByPlaceholderText('Enter Location'), 'Some Location');
    fireEvent.press(getByText('Get Weather'));

    await waitFor(() => expect(getLocationCoordinates).toHaveBeenCalledWith('Some Location'));
    await waitFor(() => expect(getWeatherForecast).toHaveBeenCalledWith(1, 1));

    expect(await findByText('Location: Location 1')).toBeTruthy();
    expect(await findByText('Average Temperature: 21°C')).toBeTruthy();
    expect(await findByText('Weekly Forecast:')).toBeTruthy();
    expect(await findByText('Day 1: 20°C')).toBeTruthy();
  });

  it('should show error message if no locations are found', async () => {
    (getLocationCoordinates as jest.Mock).mockResolvedValue([]);
    const { getByText, getByPlaceholderText } = render(<App />);

    fireEvent.changeText(getByPlaceholderText('Enter Location'), 'Some Location');
    fireEvent.press(getByText('Get Weather'));

    await waitFor(() => expect(getByText('No locations found')).toBeTruthy());
  });

  it('should handle errors when fetching weather data', async () => {
    const mockLocations = [{ id: 1, name: 'Location 1', latitude: 1, longitude: 1 }];
    (getLocationCoordinates as jest.Mock).mockResolvedValue(mockLocations);
    (getWeatherForecast as jest.Mock).mockRejectedValue(new Error('Error fetching weather data'));

    const { getByText, getByPlaceholderText } = render(<App />);

    fireEvent.changeText(getByPlaceholderText('Enter Location'), 'Some Location');
    fireEvent.press(getByText('Get Weather'));

    await waitFor(() => expect(getByText('Error fetching weather data')).toBeTruthy());
  });

  it('should update location when a suggestion is selected', async () => {
    const mockLocations = [{ id: 1, name: 'Location 1', latitude: 1, longitude: 1 }];
    const mockForecast = {
      daily: {
        temperature_2m_max: [20, 22, 21],
        weathercode: ['0'],
      },
    };

    (getLocationCoordinates as jest.Mock).mockResolvedValue(mockLocations);
    (getWeatherForecast as jest.Mock).mockResolvedValue(mockForecast);
    (getWeatherImage as jest.Mock).mockReturnValue('https://example.com/weather-image.png');

    const { getByText, getByPlaceholderText, findByText } = render(<App />);
    
    fireEvent.changeText(getByPlaceholderText('Enter Location'), 'Some Location');
    fireEvent.press(getByText('Get Weather'));

    await waitFor(() => expect(getByText('Location: Location 1')).toBeTruthy());

    fireEvent.press(getByText('Location 1'));

    expect(await findByText('Location: Location 1')).toBeTruthy();
  });
});
