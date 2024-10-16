// src/components/LocationInput.tsx
import React from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text } from 'react-native';
import styles from '../styles/weatherStyles';

interface LocationInputProps {
  location: string;
  setLocation: (location: string) => void;
  fetchWeather: () => void;
  locations: any[];
  handleLocationSelect: (loc: any) => void;
  error: string;
}

const LocationInput: React.FC<LocationInputProps> = ({
  location,
  setLocation,
  fetchWeather,
  locations,
  handleLocationSelect,
  error,
}) => {
  return (
    <View>
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
    </View>
  );
};

export default LocationInput;
