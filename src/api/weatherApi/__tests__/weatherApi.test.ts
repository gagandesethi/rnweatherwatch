// weatherApi.test.ts
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getLocationCoordinates, getWeatherForecast } from '../weatherApi'; // Adjust the path as needed

const mock = new MockAdapter(axios);

describe('Weather API', () => {
    afterEach(() => {
        mock.reset(); // Reset the mock after each test
    });

    test('getLocationCoordinates returns coordinates for a valid location', async () => {
        const location = 'London';
        const mockResponse = {
            results: [
                { latitude: 51.5074, longitude: -0.1278, name: 'London' },
            ],
        };

        mock.onGet('https://geocoding-api.open-meteo.com/v1/search', { params: { name: location } })
            .reply(200, mockResponse);

        const result = await getLocationCoordinates(location);

        expect(result).toEqual(mockResponse.results);
        expect(result[0].name).toBe('London');
    });

    test('getWeatherForecast returns weather data for given coordinates', async () => {
        const latitude = 51.5074;
        const longitude = -0.1278;
        const mockWeatherResponse = {
            daily: {
                temperature_2m_max: [15, 16, 17],
                temperature_2m_min: [10, 11, 12],
                weathercode: [0, 1, 2],
            },
        };

        mock.onGet('https://api.open-meteo.com/v1/forecast', { params: { latitude, longitude, daily: 'temperature_2m_max,temperature_2m_min,weathercode', timezone: 'auto' } })
            .reply(200, mockWeatherResponse);

        const result = await getWeatherForecast(latitude, longitude);

        expect(result).toEqual(mockWeatherResponse);
        expect(result.daily.temperature_2m_max).toEqual([15, 16, 17]);
    });

    test('getLocationCoordinates handles errors gracefully', async () => {
        const location = 'UnknownLocation';
        mock.onGet('https://geocoding-api.open-meteo.com/v1/search', { params: { name: location } })
            .reply(404);

        await expect(getLocationCoordinates(location)).rejects.toThrow();
    });

    test('getWeatherForecast handles errors gracefully', async () => {
        const latitude = 51.5074;
        const longitude = -0.1278;
        mock.onGet('https://api.open-meteo.com/v1/forecast', { params: { latitude, longitude, daily: 'temperature_2m_max,temperature_2m_min,weathercode', timezone: 'auto' } })
            .reply(404);

        await expect(getWeatherForecast(latitude, longitude)).rejects.toThrow();
    });
});
