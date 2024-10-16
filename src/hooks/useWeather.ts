import { useState, useEffect } from 'react';
import { getLocationCoordinates, getWeatherForecast } from '../api/weatherApi/weatherApi';

const useWeather = (initialLocation: string) => {
  const [location, setLocation] = useState(initialLocation);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [locations, setLocations] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false); // State to control modal visibility

  const fetchWeather = async () => {
    if (!location) return;
    try {
      const locations = await getLocationCoordinates(location);
      setLocations(locations);
      if (locations.length > 0) {
        const { latitude, longitude } = locations[0]; // Selecting the first location
        const forecast = await getWeatherForecast(latitude, longitude);
        setWeatherData(forecast);
        setSelectedLocation(locations[0].name);
        setError('');
      } else {
        setError('No locations found');
      }
    } catch (err) {
      setError('Error fetching weather data');
    }
  };

  const handleLocationSelect = async (loc: any) => {
    const { latitude, longitude } = loc;
    const forecast = await getWeatherForecast(latitude, longitude);
    setWeatherData(forecast);
    setSelectedLocation(loc.name);
    setLocations([]); // Clear the suggestions
    setModalOpen(false); // Close the modal
  };

  useEffect(() => {
    if (selectedLocation) {
      fetchWeather();
    }
  }, [selectedLocation]);

  const averageTemperature =
    weatherData &&
    Math.round(
      weatherData.daily.temperature_2m_max.reduce((a: number, b: number) => a + b, 0) /
        weatherData.daily.temperature_2m_max.length
    );

  return {
    location,
    setLocation,
    weatherData,
    locations,
    selectedLocation,
    error,
    fetchWeather,
    handleLocationSelect,
    averageTemperature,
    modalOpen,
    setModalOpen,
  };
};

export default useWeather;
