// App.tsx
import React from 'react';
import { SafeAreaView } from 'react-native';
import useWeather from './src/hooks/useWeather';
import LocationInput from './src/components/LocationInput';
import WeatherDisplay from './src/components/WeatherDisplay';
import styles from './src/styles/weatherStyles';

const App = () => {
  const {
    location,
    setLocation,
    weatherData,
    locations,
    selectedLocation,
    error,
    fetchWeather,
    handleLocationSelect,
    averageTemperature,
  } = useWeather('');

  return (
    <SafeAreaView style={styles.container}>
      <LocationInput
        location={location}
        setLocation={setLocation}
        fetchWeather={fetchWeather}
        locations={locations}
        handleLocationSelect={handleLocationSelect}
        error={error}
      />
      {weatherData && (
        <WeatherDisplay
          weatherData={weatherData}
          selectedLocation={selectedLocation}
          averageTemperature={averageTemperature}
        />
      )}
    </SafeAreaView>
  );
};

export default App;
