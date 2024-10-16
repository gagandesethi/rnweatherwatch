// src/components/WeatherDisplay.tsx
import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import getWeatherImage from '../helpers/getWeatherImage'; // Adjust the import path if needed
import styles from '../styles/weatherStyles'; // Adjust the import path if needed

interface WeatherDisplayProps {
  weatherData: any;
  selectedLocation: string | null;
  averageTemperature: number | null;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  weatherData,
  selectedLocation,
  averageTemperature,
}) => {
  return (
    <ScrollView>
      <Text style={styles.locationText}>Location: {selectedLocation}</Text>
      <Text style={styles.averageTempText}>Average Temperature: {averageTemperature}°C</Text>
      <Image
        source={{ uri: getWeatherImage(weatherData.daily.weathercode) }} // Use uri here
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
  );
};

export default WeatherDisplay;
