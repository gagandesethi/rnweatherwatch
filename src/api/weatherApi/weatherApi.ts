import axios from 'axios';

// Base URL for Open Meteo API
const BASE_URL = 'https://api.open-meteo.com/v1';

// Get coordinates for a given location using Geocoding API
export const getLocationCoordinates = async (location: string) => {
    const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search`, {
        params: { name: location }
    });
    return response.data.results;
};

// Get weather forecast for a specific latitude and longitude
export const getWeatherForecast = async (latitude: number, longitude: number) => {
    const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
            latitude,
            longitude,
            daily: 'temperature_2m_max,temperature_2m_min,weathercode',
            timezone: 'auto'
        }
    });
    return response.data;
};
