import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import { getLocationCoordinates, getWeatherForecast } from './src/api/weatherApi/weatherApi';
import getWeatherImage from './src/helpers/getWeatherImage'; // Adjust the import path if needed
import styles from './styles';

const App = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [locations, setLocations] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!location) return;

    try {
      Keyboard.dismiss();
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

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Enter Location"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={fetchWeather}>
        <Text style={styles.buttonText}>Get Weather</Text>
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {locations.length > 0 && (
        <FlatList
          data={locations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleLocationSelect(item)} style={styles.suggestion}>
              <Text style={styles.suggestionText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      {weatherData && (
        <ScrollView>
          <Text style={styles.locationText}>Location: {selectedLocation}</Text>
          <Text style={styles.averageTempText}>Average Temperature: {averageTemperature}°C</Text>
          <Image
            source={{ uri: getWeatherImage(weatherData.daily.weathercode[0]) }} // Use uri here
            style={styles.weatherImage}
          />
          <Text style={{ fontSize: 22, fontWeight: 'bold', marginVertical: 10, textAlign: 'center' }}>
            Weekly Forecast:
          </Text>
          {weatherData.daily.temperature_2m_max.map((temp: number, index: number) => (
            <Text key={index} style={styles.forecastText}>
              Day {index + 1}: {temp}°C
            </Text>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default App;
