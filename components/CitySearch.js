import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, useColorScheme } from 'react-native';

export default function CitySearch({ onSearch }) {
  const [city, setCity] = useState('');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={styles.searchBox}>
      <TextInput
        placeholder="Enter a city"
        value={city}
        onChangeText={setCity}
        style={[
          styles.input,
          { color: isDark ? '#fff' : '#000', borderBottomColor: isDark ? '#888' : '#000' },
        ]}
        placeholderTextColor={isDark ? '#aaa' : '#666'}
      />
      <Button title="Search" onPress={() => onSearch(city)} />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    marginRight: 10,
    paddingVertical: 5,
  },
});
