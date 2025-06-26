import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, Text, TouchableOpacity, Button, useColorScheme } from 'react-native';
import { View, Text, FlatList, StyleSheet, useColorScheme } from 'react-native';
import axios from 'axios';

const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';

export default function WeatherInfo({ city }) {
  const [forecast, setForecast] = useState([]);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const geoRes = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
        );
        const { lat, lon } = geoRes.data[0];
        const weatherRes = await axios.get(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=${API_KEY}`
        );
        setForecast(weatherRes.data.daily.slice(0, 7));
      } catch (err) {
        console.error(err);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <View style={{ marginVertical: 20 }}>
      <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
        7-Day Forecast for {city}
      </Text>
      <FlatList
        data={forecast}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={{ color: isDark ? '#ccc' : '#333' }}>
            {new Date(item.dt * 1000).toDateString()}: {item.temp.day}°C
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
