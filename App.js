import React, { useState, useEffect } from 'react';
import {View,Text,FlatList,TouchableOpacity,StyleSheet,Button,useColorScheme,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CitySearch from './components/CitySearch';
import WeatherInfo from './components/WeatherInfo';
import TourList from './components/TourList';

export default function App() {
  const [selectedCity, setSelectedCity] = useState('');
  const [favorites, setFavorites] = useState([]);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const data = await AsyncStorage.getItem('favorites');
    if (data) setFavorites(JSON.parse(data));
  };

  const toggleFavorite = async (city) => {
    let updated;
    if (favorites.includes(city)) {
      updated = favorites.filter((c) => c !== city);
    } else {
      updated = [...favorites, city];
    }
    setFavorites(updated);
    await AsyncStorage.setItem('favorites', JSON.stringify(updated));
  };

  const isFavorite = (city) => favorites.includes(city);

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <CitySearch onSearch={setSelectedCity} />

      {selectedCity ? (
        <Button
          title={isFavorite(selectedCity) ? '★ Unfavorite' : '☆ Add to Favorites'}
          onPress={() => toggleFavorite(selectedCity)}
        />
      ) : null}

      {favorites.length > 0 && (
        <FlatList
          data={favorites}
          horizontal
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelectedCity(item)}>
              <Text style={[styles.favorite, { color: isDark ? '#FFD700' : '#000' }]}>
                ★ {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}

      {selectedCity ? (
        <>
          <WeatherInfo city={selectedCity} />
          <TourList city={selectedCity} />
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 20,
  },
  favorite: {
    marginRight: 10,
    fontSize: 16,
  },
});
