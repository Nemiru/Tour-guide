import React, { useState, useEffect } from 'react';
import {View,Text,FlatList,TouchableOpacity,StyleSheet,Button,useColorScheme,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CitySearch from './components/CitySearch';
import WeatherInfo from './components/WeatherInfo';
import TourList from './components/TourList';

export default function App() {
  const [selectedCity, setSelectedCity] = useState('');
  const [favourites, setFavourites] = useState([]);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    loadFavourites();
  }, []);

  const loadFavourites = async () => {
    const data = await AsyncStorage.getItem('favourites');
    if (data) setFavourites(JSON.parse(data));
  };

  const toggleFavourite = async (city) => {
    let updated;
    if (favourites.includes(city)) {
      updated = favourites.filter((c) => c !== city);
    } else {
      updated = [...favourites, city];
    }
    setFavourites(updated);
    await AsyncStorage.setItem('favourites', JSON.stringify(updated));
  };

  const isFavourite = (city) => favourites.includes(city);

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <CitySearch onSearch={setSelectedCity} />

      {selectedCity ? (
        <Button
          title={isFavourite(selectedCity) ? '★ Unfavourite' : '☆ Add to Favourites'}
          onPress={() => toggleFavourite(selectedCity)}
        />
      ) : null}

      {favourites.length > 0 && (
        <FlatList
          data={favourites}
          horizontal
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelectedCity(item)}>
              <Text style={[styles.favourite, { color: isDark ? '#FFD700' : '#000' }]}>
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
  favourite: {
    marginRight: 10,
    fontSize: 16,
  },
});
