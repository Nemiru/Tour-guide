import React from 'react';
import { View, Text, Button, StyleSheet, useColorScheme } from 'react-native';

const mockTours = {
  Paris: ['Eiffel Tower Tour', 'Louvre Museum Visit'],
  London: ['Thames River Cruise', 'London Eye Ride'],
  Tokyo: ['Mt. Fuji Day Trip', 'Shibuya Food Tour'],
  NewYork: ['Statue of Liberty Tour', 'Central Park Bike Ride'],
  Rome: ['Colosseum Guided Tour', 'Vatican Museums Visit'],
  Sydney: ['Sydney Opera House Tour', 'Bondi Beach Surf Lesson'],
  Cairo: ['Pyramids of Giza Tour', 'Nile River Dinner Cruise'],
  Rio: ['Christ the Redeemer Visit', 'Copacabana Beach Walk'],
  Bangkok: ['Floating Market Tour', 'Temple of the Emerald Buddha Visit'],
  CapeTown: ['Table Mountain Cableway', 'Robben Island Tour'],
};

export default function TourList({ city }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const tours = mockTours[city] || ['City Walking Tour'];

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
        Tours in {city}:
      </Text>
      {tours.map((tour, index) => (
        <View key={index} style={styles.tourItem}>
          <Text style={{ color: isDark ? '#ccc' : '#333', marginBottom: 5 }}>
            {tour}
          </Text>
          <Button
            title="Book Tour"
            onPress={() => alert(`Booked: ${tour}`)}
            color={isDark ? '#4CAF50' : undefined}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 10 },
  title: { fontWeight: 'bold', fontSize: 16, marginBottom: 10 },
  tourItem: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
  },
});
